import React, { useState, useEffect } from 'react';
import { Button, TextInput, View, StyleSheet, TouchableOpacity, Text, Alert, FlatList } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


function AddLunch({ route }) {
    const [permissionResponse, requestPermission] = BarCodeScanner.usePermissions();
    const [hasPermission, setHasPermission] = useState(null)
    const [query, setQuery] = useState('');
    const [result, setResult] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [barcode, setBarcode] = useState(null);
    const [currentFood, setCurrentFood] = useState(null);
    const [showScanner, setShowScanner] = useState(false);
    
    const apiKey = 'sd8DWPmBSnFocMzJvTzQ6JcE1vHRxsabdd08JOC8';

    const handleInputChange = (text) => {
        setSearchTerm(text);
    };

    const BreakFast = [
        { key: 'item1', value: 'Eggs' },
        { key: 'item2', value: 'Orange Juice' },
    ];

    const renderItem = ({ item }) => {
        return (
            <View key={item.key}>
                {/** For Nutrition Page navigation */}
                <TouchableOpacity style={{ padding: 10, borderBottomColor: 'black', borderBottomWidth: 1 }}
                onPress={() => navigation.navigate('Search', { foodId: item.key })}
                >
                    <Text>{item.name}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const handleSearchClick = () => {
        if (searchTerm)
        {
            const dataType = ["Survey (FNDDS)"];
            const pageSize = 20;
            const endpoint = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(apiKey)}&query=${encodeURIComponent(searchTerm)}&dataType=${encodeURIComponent(dataType)}&pageSize=${encodeURIComponent(pageSize)}`;
        
        fetch(endpoint).then(response => response.json()).then(data => {
            const results = data.foods.map(item => ({ key: item.fdcId, name: item.description }));
            setResult(results);
        }).catch(error => console.log(error));
        }

        else
        {
            setResult([]);
        }
        
    };

    const navigation = useNavigation();


    const requestCameraPermission = async () => {
        const { status } = await requestPermission();
        setHasPermission(status === 'granted');
    };

    const handleBarCodeVisibility = () => {
        if (showScanner == false) {
            setShowScanner(true);
        }

        else {
            setShowScanner(false);
        }
    }

    const handleScanBarcodePress = () => {
        // send alert to user to manually turn on camera
        requestCameraPermission()
        if (permissionResponse.canAskAgain == false) {
            Alert.alert('Camera disabled', 'Enable manually on settings > Expo Go > Camera')
        }

        else if (permissionResponse.granted) {
            handleBarCodeVisibility()
        }

    };

    const format = (barcodeNumber) => {
        const originalCode = barcodeNumber;
        const convertedCode = originalCode.substring(1);
        return convertedCode;
    }

    const getBarcodeResult = (data) => {
        endpoint = `https://api.nal.usda.gov/fdc/v1/foods/search?query=gtinUpc:${data}&api_key=${apiKey}`
        fetch(endpoint).then((response) => response.json()).then(data => {
            const results = data.foods[0];
            
            if(results === undefined)
            {
                console.log("product doesn't exists");
                Alert.alert("Product doesn't exist or wrong orientation", "Please use manualEntry or scan another barcode");
            }

            else
            {   
                console.log('succesful: ' + results.fdcId);
                sendNutrientValues(results.fdcId);
            }

        }).catch((error) => console.error(error));
    }

    const sendNutrientValues = (fdcId) => {
        //
        endpoint = `https://api.nal.usda.gov/fdc/v1/food/${fdcId}?nutrients=203&nutrients=204&nutrients=205&nutrients=208&api_key=${apiKey}`;
        fetch(endpoint).then((response) => response.json()).then(data => {
            const labelNutrients = data.labelNutrients;
            var nutrientList = [data.description, labelNutrients.calories.value, labelNutrients.carbohydrates.value, labelNutrients.fat.value, labelNutrients.protein.value];
            console.log(nutrientList);
            navigation.navigate('BarcodeEntry', nutrientList);

        }).catch((error) => console.error(error));
    }

    const handleBarCodeScanned = ({ type, data }) => {
        setShowScanner(false);
        endpoint = `https://api.nal.usda.gov/fdc/v1/foods/search?query=gtinUpc:${data}&api_key=${apiKey}`
       
        fetch(endpoint).then((response) => response.json()).then(results => {
            const result_doc = results.foods[0];
            
            if(result_doc === undefined)
            {
                // if the result is not found, make another request with with a single zero infront
                const fdcId = getBarcodeResult(format(data));
            }

            else
            {
                sendNutrientValues(results.fdcId);
            }

        }).catch((error) => console.error(error));

    };

    

    const handleFloatingButton = () => {
        
        navigation.navigate('ManualLogLunch');
    };

    // to execute the search when the user submits the form:
    const handleSearch = (e) => {
        e.preventDefault();
        fetchFoodData();
      };
    
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    value={searchTerm}
                    onChangeText={handleInputChange}
                    placeholder="Search..."

                />

                <Button title="Search" onPress={handleSearchClick} />
                <TouchableOpacity onPress={handleScanBarcodePress}>
                    <AntDesign name="scan1" size={24} color="black" />
                </TouchableOpacity>

            </View>
            
            {showScanner ? (
                <BarCodeScanner
                    onBarCodeScanned={handleBarCodeScanned}
                    style={styles.camera}
                />
            ) :

            ( <FlatList
                data={result}
                renderItem={renderItem}
                keyExtractor={(item) => item.key}/>
            )}

            <TouchableOpacity style={styles.floating} onPress={handleFloatingButton}>
               <AntDesign name="plus" size={24} color="white"/>
            </TouchableOpacity>
            
        </View>
        );
    }

export default AddLunch;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        flex: 1,
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    floating: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: 'blue',
        borderRadius: 25,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },

    camera: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },

    // add food manually - start
    addManualContainer:{
        justifyContent:'flex-end',
        alignItems:'flex-end',
    },
    AddFoodManually: {
        marginTop:5,
        marginRight:15,
        marginBottom:15,
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf:'auto',
        borderColor:'black',
        borderWidth:1,
        height:88,
        width:88,
        borderRadius:50,
    },
    
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent:'center',
        alignItems:'center',
        
    },

});

