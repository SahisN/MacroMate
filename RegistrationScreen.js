import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {SafeAreaView, ScrollView, Text} from 'react-native';
import COLORS from '../../conts/colors';

const RegistrationScreen = ({navigation}) => {
    return {
        <SafeAreaView style = {{backgroundColor: COLORS.white, flex: 1}}
        <ScrollView
        contentContainerStyle={{
            paddingTop: 50,
            paddingHorizontal: 20,
        }}>
        <Text style={{color: COLORS.black, fontSize: 40, fontWeight: 'bold'}}>
        Signup
        </Text><Text style = {{color: COLORS.grey, fontSize: 18, marginVertical: 10}}
        </SafeAreaView>
        <Inputplaceholder="Enter your email address"
        iconName="email-outline"
        label="Email"
        />
        <Input
        placeholder= "Enter your password"
        iconName="lock-outline"
        label="Password"
        password
        />
        <Button title="Sign up" />
        <Text></Text>
        </View>
        </Scrollview>
    };
};

export default RegistrationScreen;