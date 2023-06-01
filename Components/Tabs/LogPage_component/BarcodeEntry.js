import { SafeAreaView, Text, StyleSheet, TextInput, TouchableOpacity, Keyboard, View, ScrollView, Alert} from 'react-native';
import React, { useState } from 'react';
import { firebase } from '../../../AppConfiguration/config';
import { Picker } from '@react-native-picker/picker';
import { useEffect } from 'react';


export default function BarcodeEntry({route, navigation})
{
    
    // modifyable data -> these data will be changed by serving size
    const [foodName, setFoodName] = useState('');
    const [calories, setCalories] = useState('');
    const [serving, setServing] = useState('');
    const [protein, setProtein] = useState('');
    const [fats, setFats] = useState('');
    const [carbs, setCarbs] = useState('');
    const [selectedMeal, setSelectedMeal] = useState("breakfast");
    const [selectedMealId, setSelectedMealId] = useState(0);

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
        setStaticCarbs(parseInt(carbs));
    }

    const updateFats = () => {
        setStaticFats(parseInt(fats));
    }

    const updateProtein = () => {
        setStaticProtein(parseInt(protein));
    }

    const setDropDownValues = (mealName, mealId) => {
        setSelectedMeal(mealName);
        setSelectedMealId(mealId);
    }

    const getNumericValue = (text) => {
        const numericValue = text.replace(/[^0-9.]/g, '');
        return numericValue;
    }

    const setValues = (foodData) => {
        setFoodName(foodData[0]);
        setCalories(foodData[1]);
        setCarbs(foodData[2]); // carbs
        setFats(foodData[3]); // fats
        setProtein(foodData[4]); // protien

        
        setStaticCalories(foodData[1]); //cal
        setStaticCarbs(foodData[2]); // carbs
        setStaticFats(foodData[3]); // fats
        setStaticProtein(foodData[4]); // protien

        Alert.alert('Input meal name', 'meal name is set to breakfast by default')
    }

   // const myProp = route.params ? setValues(route.params) : false;

    useEffect(() =>{
        if(route.params){
            setValues(route.params)
        }
    },[]);

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
            setCalories(staticCalories);
            setCarbs(staticCarbs);
            setFats(staticFats);
            setProtein(staticProtein);
        }
    }

    const handlePressed = () => {
        if (selectedMeal && foodName && calories >= 0 && serving >= 0 && fats >= 0 && carbs >= 0 && protein >= 0) {
        var foodList = [foodName, serving, selectedMealId];
        navigation.navigate('LogPage', foodList);
        }

        else {
            Alert.alert('Missing values', 'Please add values to all the fields');
        }
    }


    return(
        <ScrollView>
            {/** Food Name Input */}
            <View style={styles.theme}>
                <TextInput
                    style={[styles.input, { borderWidth: 0, }]}
                    placeholder='Food Name...'
                    onChangeText={(text) => setFoodName(text)}
                    value={foodName}
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
                        returnKeyType='done'
                        placeholder='calories'
                        placeholderTextColor={'#aaaaaa'}
                        onChangeText={(text) => setCalories(getNumericValue(text))}
                        onBlur={(text) => updateCalories()}
                        value={'' + calories}
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
                        onChangeText={(text) => updateValue(getNumericValue(text))}
                        value={'' + serving}
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
                        returnKeyType='done'
                        placeholder='carbs'
                        placeholderTextColor={'#aaaaaa'}
                        onChangeText={(text) => setCarbs(getNumericValue(text))}
                        onBlur={(text) => updateCarbs()}
                        value={'' + carbs}
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
                        returnKeyType='done'
                        placeholder='fats'
                        placeholderTextColor={'#aaaaaa'}
                        onChangeText={(text) => setFats(getNumericValue(text))}
                        onBlur={(text) => updateFats()}
                        value={'' + fats}
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
                        returnKeyType='done'
                        placeholder='protein'
                        placeholderTextColor={'#aaaaaa'}
                        onChangeText={(text) => setProtein(getNumericValue(text))}
                        onBlur={(text) => updateProtein()}
                        value={'' + protein}
                        multiline={true}
                        underlineColorAndroid={'transparent'}
                        autoCapitalize='none'
                    />
                </View>
                <Text style={{ marginTop: 20, marginRight: 10, fontSize: 20 }}>g</Text>

            </View>

            {/** Meal name dropdown list and label */}
            <View style={[styles.theme, { marginTop: 2 }]}>
                <Text style={[styles.labelText, { textAlign: 'center', marginTop: 10 }]}>Meal Name</Text>

                <Picker selectedValue={selectedMeal} onValueChange={(itemValue, itemIndex) => setDropDownValues(itemValue, itemIndex)}>
                    <Picker.Item label='Breakfast' value='breakfast' />
                    <Picker.Item label='Lunch' value='lunch' />
                    <Picker.Item label='Dinner' value='dinner' />
                    <Picker.Item label='Snack' value='snack' />
                </Picker>

            </View>

            {/** Add Food Button */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handlePressed}>
                    <Text style={styles.buttonLabel}>Add Food</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    );
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