import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLOR from '../../conts/Color';
const Input = ({
    label,
    iconName,
    error,
    password,
    onFocus = () => {},
    ...props
}) => {
    const [isFocused,setIsFocused] = React.useState(false);
    return <View style={{marginBottom: 20}}>
        <Text style={style.label}> {label}</Text>
        <View style={[style.inputContainer]}>
            <Icon 
            name={iconName} 
            style={{fontSize: 22, color: COLORS.blue, marginRight: 10}}
            />
            <TextInput
            autoCorrect={false}
            onFocus={() => {
                onFocus();
                setIsFocused(true);
            }}
            onBlur={() => {
                setIsFocused(false);
            }}
            style={{color: COLORS.blue, flex: 1}}
            {...props}
            />
        </View>
    </View>;
};

const style = StyleSheet.create({
    label: {
        marginVertical: 5,
        fontSize: 14,
        color: Colors.grey,
    },
    inputContainer: {
        height: 55,
        backgroundColor: Colors.light,

    }
})

export default Input;