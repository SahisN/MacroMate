import React, { Component } from 'react';
import { View, StyleSheet, Animated, Text, SafeAreaView, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Canvas from './Components/Canvas';

//import SplashScreen from './Components/SplashScreen';
import HomePage from './Components/HomePage'
import Test from './Test';
import Scan from './Components/Tabs/LogPage_component/Scan'
import FoodInput from './Components/Tabs/LogPage_component/FoodInput'
import AddFood from './Components/Tabs/AddFood'
import LogPage from './Components/Tabs/LogPage'


export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <HomePage/>
   </SafeAreaView>
   
    
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
