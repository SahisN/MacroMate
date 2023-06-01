
import React, { Component, useState, useEffect} from 'react';
import { Text, View, SafeAreaView, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogList from './LogPage_component/LogList';
import { ScrollView } from 'react-native';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

//screens
import AddFood from './AddFood';
import AddLunch from './LogPage_component/manualLogs/AddLunch';
import AddDinner from './LogPage_component/manualLogs/AddDinner';
import AddSnack from './LogPage_component/manualLogs/AddSnack';

import LogHistory from './LogHistory';
import ManualLogLunch from './LogPage_component/manualLogs/ManualLogLunch';
import ManualLogDinner from './LogPage_component/manualLogs/ManualLogDinner';
import ManualLogSnack from './LogPage_component/manualLogs/ManualLogSnack';




import ManualEntry from './LogPage_component/ManulLogToDB';
import BarcodeEntry from './LogPage_component/BarcodeEntry';
import FoodInput from './LogPage_component/FoodInput';

function LogPage({ navigation, route }) {
    const[breakFast, setBreakFast] = useState([]);
    const[lunch, setLunch] = useState([]); //{value: 'Rice', serving: 2}, {value: 'Chicken', serving: 1}
    const[dinner, setDinner] = useState([]); // {value: 'Steak', serving: 3}, {value: 'mash potato', serving: 1}
    const[snacks, setSnacks] = useState([]); // {value: 'Peas', serving: 5}, {value: 'Carrots', serving: 2}

    const isFocused = useIsFocused();

    useEffect(() => {
      if (isFocused && route.params) {
        // Call your side effect function here
        var foodList = route.params;
        var mealId = foodList[2];

        // mealId 0 is for breakfast
        if(mealId == 0) {
            setBreakFast([...breakFast, {value: foodList[0], serving: foodList[1]}]);
        }

        // mealId 1 is for lunch
        else if(mealId == 1) {
            setLunch([...lunch, {value: foodList[0], serving: foodList[1]}]);
        }

        // mealId 2 is for dinner
        else if(mealId == 2) {
            setDinner([...dinner, {value: foodList[0], serving: foodList[1]}]);
        }
        
        // mealId 3 is for snacks
        else if(mealId == 3) {
            setSnacks([...snacks, {value: foodList[0], serving: foodList[1]}]);
        }

        route.params = undefined;
      }
      
    }, [isFocused, navigation]);

    // when 'AddFood' button is pressed
    const onPressed = () => {
        navigation.navigate('AddFood')
    }
    const onPressedLogHistory = () => {
        navigation.navigate('LogHistory')
    }



    







    // used for adding lunch, dinner, or snack
     const onPressedAddLunch = () => {
        navigation.navigate('AddLunch')
    }
    const onPressedManualLogLunch = () => {
        navigation.navigate('ManualLogLunch')
    }


    const onPressedAddDinner = () => {
        navigation.navigate('AddDinner')
    }
    const onPressedManualLogDinner = () => {
        navigation.navigate('ManualLogDinner')
    }



    const onPressedAddSnack = () => {
        navigation.navigate('AddSnack')
    }
    const onPressedManualLogSnack = () => {
        navigation.navigate('ManualLogSnack')
    }





    return (
        
        <ScrollView contentContainerStyle={{ padding: 10 }}>
            <SafeAreaView style={{ flex: 1 }}>
                
                <Text style={[styles.Text]}>BreakFast</Text>
                <LogList data={breakFast} />
                <View style={styles.button}><Button title={'Add Food'} onPress={onPressed} /></View>

                <Text style={[styles.Text, { marginTop: 20 }]}>Lunch</Text>
                <LogList data={lunch} />
                <View style={styles.button}><Button title={'Add Food'} titleStyle={{ fontSize: 50 }} onPress={onPressedAddLunch} /></View>

                <Text style={[styles.Text, { marginTop: 20 }]}>Dinner</Text>
                <LogList data={dinner} />
                <View style={styles.button}><Button title={'Add Food'} titleStyle={{ fontSize: 50 }} onPress={onPressedAddDinner} /></View>

                <Text style={[styles.Text, { marginTop: 20 }]}>Snacks</Text>
                <LogList data={snacks} />
                <View style={styles.button}><Button title={'Add Food'} titleStyle={{ fontSize: 50 }} onPress={onPressedAddSnack} /></View>

                <SafeAreaView style={styles.logHistory}><Button title={'Log history'} titleStyle={{ fontSize: 50, }} onPress={onPressedLogHistory} /></SafeAreaView>

            </SafeAreaView>
        </ScrollView>
        
    );
}

const Stack = createNativeStackNavigator();

function StackNav() {
    return (

        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName='LogPage' >
                <Stack.Screen name='LogPage' component={LogPage} options={{ headerShown: false }} />
                <Stack.Screen name='AddFood' component={AddFood} />
                <Stack.Screen name='ManualEntry' component={ManualEntry} />
                <Stack.Screen name='BarcodeEntry' component={BarcodeEntry} />
                <Stack.Screen name='Search' component={FoodInput} />
                <Stack.Screen name='LogHistory' component={LogHistory} />

                <Stack.Screen name='AddLunch' component={AddLunch} />
                <Stack.Screen name='AddDinner' component={AddDinner} />
                <Stack.Screen name='AddSnack' component={AddSnack} />

                <Stack.Screen name='ManualLogLunch' component={ManualLogLunch} />
                <Stack.Screen name='ManualLogDinner' component={ManualLogDinner} />
                <Stack.Screen name='ManualLogSnack' component={ManualLogSnack} />









            </Stack.Navigator>
        </NavigationContainer>

    );

}


const styles = StyleSheet.create({
    Text:
    {
        fontWeight: 'bold',
        fontSize: 30,
        backgroundColor: 'white',
        padding: 10
    },

    Link:
    {
        fontWeight: 'bold',
        fontSize: 30,
        color: 'blue',
        marginLeft: 10,
        marginTop: 1,
        backgroundColor: 'white'
    },

    button:
    {
        alignItems: 'flex-start',
        backgroundColor: 'white',
        marginTop: 2,
    },
    logHistory: {
        alignItems: 'flex-start',
        backgroundColor: 'white',
        marginTop: 12,
        marginBottom:10,
    },


    
    AddFoodManually: {
        justifyContent: 'center',
        paddingTop: 20,
        marginBottom: 40,
        fontWeight: 'bold',
        fontSize: 20,
        backgroundColor: 'white',
        borderRadius: 50,
        width: '7%',
        height: '10%',
        alignContent: 'center',
    },
    buttonText: {
        fontSize: 33,
        fontWeight: 'bold',
        textAlign: 'center',
    }
    // add addFood manully styling - end


});

export default StackNav;
