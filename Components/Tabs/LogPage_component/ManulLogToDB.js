import { Text, StyleSheet, TextInput, TouchableOpacity, Keyboard, View, ScrollView, Alert} from 'react-native';
import React, { useState } from 'react';
import { firebase } from '../../../AppConfiguration/config';

function ManualEntry({ navigation }) {
    const logsRef = firebase.firestore().collection('manualLogs');

    // Get the username from the Login page and associate it each with each user Log.
    // That is, add username as another field in the form.
    
    // modifyable data -> these data will be changed by serving size
    const [foodName, setFoodName] = useState('');
    const [calories, setCalories] = useState('');
    const [serving, setServing] = useState('');
    const [protein, setProtein] = useState('');
    const [fats, setFats] = useState('');
    const [carbs, setCarbs] = useState('');
    const [type, setType] = useState("breakfast");
    
    // static data -> these data won't be changed by serving size
    const [staticCalories, setStaticCalories] = useState('');
    const [staticCarbs, setStaticCarbs] = useState('');
    const [staticFats, setStaticFats] = useState('');
    const [staticProtein, setStaticProtein] = useState('');
  
    // macroNutrients update functions
    const updateCalories = () => {
        setStaticCalories(parseInt(calories));      
    }

    const updateCarbs = () => {
        console.log('updated')
        setStaticCarbs(parseInt(carbs));
    }

    const updateFats = () => {
        setStaticFats(parseInt(fats));
    }

    const updateProtein = () => {
        setStaticProtein(parseInt(protein));       
    }

    const addLog = () => {
        if (foodName && calories && serving && protein && fats && carbs) {
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            var per_serving = parseInt(serving)
            const log = {
                foodName:foodName,
                calories: '' + parseInt(calories) * per_serving,
                serving: serving,
                protein: '' + parseInt(protein) * per_serving,
                fats: '' + parseInt(fats) * per_serving,
                carbs: '' + parseInt(carbs) * per_serving,
                type: type,
                createdAt: timestamp
            };
            logsRef
                .add(log)
                .then(() => {
                    setFoodName('');
                    setCalories('');
                    setServing('');
                    setProtein('');
                    setFats('');
                    setCarbs('');
                    setType('');
                    Keyboard.dismiss();
                })
                .catch((error) => {
                    alert(error);
                })
        }
    }

    // const handlePressed = () => {
    //     if (selectedMeal && foodName && calories && serving && fats && carbs && protein) {
    //     var foodList = [foodName, serving, selectedMealId];
    //     navigation.navigate('LogPage', foodList);
    //     }

    //     else {
    //         Alert.alert('Missing values', 'Please add values to all the fields');
    //     }
    // }

    const setDropDownValues = (mealName, mealId) => {
        // setSelectedMeal(mealName);
        // setSelectedMealId(mealId);
    }

    const getNumericValue = (text) => {
        const numericValue = text.replace(/[^0-9.]/g, '');
        return numericValue;
    }

    // updates the macronutrient based on the user serving input working mode
    const updateValue = (text) => {
        setServing(getNumericValue(text));
        
        // check if serving is empty 
        if(text)
        {
            var user_serving = parseInt(text);

           /** Following if statements checks if the fields are empty or not */
           if(calories) {
            setCalories(staticCalories * user_serving);
           }
           
           if(carbs) {
            // if carbs is not empty, multiply carbs by serving & update
            setCarbs(staticCarbs * user_serving);
           }

           if(fats) {
            // if fats is not empty, multiply fats by serving & update
            setFats(staticFats * user_serving);
           }
           
           if(protein) {
            // if protein is not empty, multiply protein by serving & update
            setProtein(staticProtein * user_serving);
           }
      
        }

        // if it's empty, display the user set value
        else
        {
            // set fields to default values when serving field is empty
            setCalories('' + staticCalories);
            setCarbs('' + staticCarbs);
            setFats('' + staticFats);
            setProtein('' + staticProtein);
        }
    }

    // Display the `Form` for user inputs.
    return (
        <ScrollView>
            <View style={styles.theme}>
                <TextInput
                    style={[styles.input, { borderWidth: 0, }]}
                    placeholder='Breakfast name...'
                    onChangeText={(text) => setFoodName(text)}
                    value={foodName}
                    placeholderTextColor={'#aaaaaa'}
                    multiline={true}
                    underlineColorAndroid={'transparent'}
                    autoCapitalize='none'
                />
            </View>

            {/** Calories per serving input and label */}
            <View style={[styles.theme, { marginTop: 2, flexDirection: 'row' }]}>

                <View style={[styles.labelsView, { flex: 2 }]}>
                    <Text style={styles.labelText}>Calories per Serving</Text>
                </View>
                
                <View>
                    <TextInput
                        style={[styles.input, { width: 150 }]}
                        keyboardType='numeric'
                        placeholder='calories'
                        placeholderTextColor={'#aaaaaa'}
                        onChangeText={(text) => setCalories(text)}
                        value={calories}
                        multiline={true}
                        underlineColorAndroid={'transparent'}
                        autoCapitalize='none'
                    />
                </View>
                <Text style={{ marginTop: 20, marginRight: 10, fontSize: 20 }}>cal</Text>

            </View>

            {/** Serving input and label */}
            <View style={[styles.theme, { marginTop: 2, flexDirection: 'row' }]}>

                <View style={[styles.labelsView, { flex: 2 }]}>
                    <Text style={styles.labelText}>Serving</Text>
                </View>

                <View>
                    <TextInput
                        style={[styles.input, { width: 150, marginRight: 35}]}
                        keyboardType='numeric'
                        returnKeyType='done'
                        placeholder='serving'
                        placeholderTextColor={'#aaaaaa'}
                        onChangeText={(text) => setServing(text)}
                        value={serving}
                        multiline={true}
                        underlineColorAndroid={'transparent'}
                        autoCapitalize='none'
                    />
                </View>
                
            </View>

            {/** Carbs input and label */}
            <View style={[styles.theme, { marginTop: 2, flexDirection: 'row' }]}>

                <View style={[styles.labelsView, { flex: 2 }]}>
                    <Text style={styles.labelText}>Carbohydrates</Text>
                </View>

                <View>
                    <TextInput
                        style={[styles.input, { width: 150 }]}
                        keyboardType='numeric'
                        placeholder='carbs'
                        placeholderTextColor={'#aaaaaa'}
                        onChangeText={(text) => setCarbs(text)}
                        value={carbs}
                        multiline={true}
                        underlineColorAndroid={'transparent'}
                        autoCapitalize='none'
                    />
                </View>
                <Text style={{ marginTop: 20, marginRight: 10, fontSize: 20 }}>g</Text>

            </View>

            {/** Fats input and label */}
            <View style={[styles.theme, { marginTop: 2, flexDirection: 'row' }]}>

                <View style={[styles.labelsView, { flex: 2 }]}>
                    <Text style={styles.labelText}>Fats</Text>
                </View>

                <View>
                    <TextInput
                        style={[styles.input, { width: 150 }]}
                        keyboardType='numeric'
                        placeholder='fats'
                        placeholderTextColor={'#aaaaaa'}
                        onChangeText={(text) => setFats(text)}
                        value={fats}
                        multiline={true}
                        underlineColorAndroid={'transparent'}
                        autoCapitalize='none'
                    />
                </View>
                <Text style={{ marginTop: 20, marginRight: 10, fontSize: 20 }}>g</Text>

            </View>

            {/** Protien input and label */}
            <View style={[styles.theme, { marginTop: 2, flexDirection: 'row' }]}>

                <View style={[styles.labelsView, { flex: 2 }]}>
                    <Text style={styles.labelText}>Protien</Text>
                </View>

                <View>
                    <TextInput
                        style={[styles.input, { width: 150 }]}
                        keyboardType='numeric'
                        placeholder='protein'
                        placeholderTextColor={'#aaaaaa'}
                        onChangeText={(text) => setProtein(text)}
                        value={protein}
                        multiline={true}
                        underlineColorAndroid={'transparent'}
                        autoCapitalize='none'
                    />
                </View>
                <Text style={{ marginTop: 20, marginRight: 10, fontSize: 20 }}>g</Text>
            </View>
            

            {/* <View style={[styles.theme, { marginTop: 2 }]}>
                <Text style={[styles.labelText, { textAlign: 'center', marginTop: 10 }]}>Meal Name</Text>

                <Picker selectedValue={selectedMeal} onValueChange={(itemValue, itemIndex) => setDropDownValues(itemValue, itemIndex)}>
                    <Picker.Item label='Breakfast' value='breakfast' />
                    <Picker.Item label='Lunch' value='lunch' />
                    <Picker.Item label='Dinner' value='dinner' />
                    <Picker.Item label='Snack' value='snack' />
                </Picker>
            </View> */}

            {/** Add Food Button */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={addLog}>
                    <Text style={styles.buttonLabel}>Add Food</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    header: {
        textAlign: 'center',
        fontWeight: 'bold',
    },

    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontSize: 18,
        margin: 15
    },

    labelsView: {
        padding: 10,
        margin: 15,
        fontSize: 20
    },

    labelText: {
        fontSize: 18,
        fontWeight: 'bold'
    },


    theme: {
        backgroundColor: 'white'
    },

    button: {
        backgroundColor: 'green',
        height: 40,
        width: 400,
        borderRadius: 5
    },

    buttonLabel:
    {
        textAlign: 'center',
        marginTop: 5,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    },

    buttonContainer: {
        flex: 2,
        alignItems: 'center'
    },
});

export default ManualEntry;
