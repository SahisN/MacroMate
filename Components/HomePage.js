import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SplashScreen from './SplashScreen';
import TabNavigator from './TabNavigator';
import LoginPage from './LoginPage'

function MyComponent() {
  const [isVisible, setIsVisible] = useState(true);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timeoutId1 = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    const timeoutId2 = setTimeout(() => {
      setShowText(true);
    }, 5500);

    return () => {
      clearTimeout(timeoutId1);
      clearTimeout(timeoutId2);
    };
  }, []);

  return isVisible ? (<SplashScreen/>) : (<LoginPage/>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 2,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default MyComponent;
