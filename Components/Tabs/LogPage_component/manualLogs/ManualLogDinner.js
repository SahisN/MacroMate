import { SafeAreaView, Text, StyleSheet, TextInput, TouchableOpacity, Keyboard, View, ScrollView, Alert} from 'react-native';
import React, { useState } from 'react';
import { firebase } from '../../../../AppConfiguration/config';

function ManualLogDinner({ navigation }) {
    const logsRef = firebase.firestore().collection('manualLogs');

    const [foodName, setFoodName] = useState('');
    const [calories, setCalories] = useState('');
    const [serving, setServing] = useState('');
    const [protein, setProtein] = useState('');
    const [fats, setFats] = useState('');
    const [carbs, setCarbs] = useState('');
    const [type, setType] = useState("dinner");
  
    const updateCalories = () => {
        setStaticCalories(parseInt(calories));      
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

    // Display the `Form` for user inputs.
    return (
        <ScrollView>
            <View style={styles.theme}>
                <TextInput
                    style={[styles.input, { borderWidth: 0, }]}
                    placeholder='Dinner name...'
                    onChangeText={(text) => setFoodName(text)}
                    value={foodName}
                    placeholderTextColor={'#aaaaaa'}
                    multiline={true}
                    underlineColorAndroid={'transparent'}
                    autoCapitalize='none'
                />
            </View>

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

export default ManualLogDinner;
