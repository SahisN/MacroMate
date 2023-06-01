import { SafeAreaView, Text, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import React, { useState } from 'react';
// import HealthImage from '../assets/Health.png';
import HealthImage from '../../assets/health.png';


const ProfilePage = () => {
    const rows = [
        { description: 'UserName', content: 'Full name' },
        
        
        { description: 'Email', content: 'name@host.xyz' },
        
    ];

    return (
        <ScrollView>
            <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
                <SafeAreaView style={styles.row}>
                    <SafeAreaView style={styles.rowNContaier}>
                        <Text style={styles.description}>Profile</Text>
                        <SafeAreaView style={styles.content}>
                            {/* <Text style={styles.image}></Text> */}
                            <Image
                                style={styles.image}
                                source={HealthImage}
                            />
                        </SafeAreaView>
                    </SafeAreaView>
                </SafeAreaView>

                {rows.map(({ description }, index) => (
                    <SafeAreaView style={styles.row} key={index}>
                        <SafeAreaView style={styles.rowNContaier}>
                            <Text style={styles.description}>{description}</Text>
                            <SafeAreaView style={styles.content}>
                                <Text>{rows[index].content}</Text>
                            </SafeAreaView>
                        </SafeAreaView>
                    </SafeAreaView>
                ))}
            </SafeAreaView>
        </ScrollView>

    );
};

const styles = StyleSheet.create({
    rowNContaier: {
        flexDirection: 'row',
        height: 80,
        marginLeft: 10,
        marginRight: 10,
    },
    row: {
        flexDirection: 'column',
        height: 80,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'center',
    },
    description: {
        height: 50,
        borderRadius: 10,
        paddingLeft: 15,
        flex: 1,
        paddingTop: 19,
        marginTop: 10,
    },
    content: {
        borderRadius: 50,
        height: 80,
        width: '33.33%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    image: {
        height: 80,
        width: 80,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#D3D3D3',
        borderWidth: 1,
    }
})

export default ProfilePage;
