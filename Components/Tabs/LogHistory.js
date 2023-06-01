import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, FlatList } from 'react-native';
import { firebase } from '../../AppConfiguration/config';

const LogHistory = () => {
    const [logsList, setLogsList] = useState([]);

    useEffect(() => {
        const unsubscribe = firebase.firestore().collection('manualLogs').onSnapshot(querySnapshot => {
            const currLogData = [];

            querySnapshot.forEach(doc => {
                currLogData.push({
                    id: doc.id,
                    calories: doc.data().calories,
                    carbs: doc.data().carbs,
                    fats: doc.data().fats,
                    foodName: doc.data().foodName,
                    protein: doc.data().protein,
                    serving: doc.data().serving,
                });
            });
            currLogData.sort((b, a) => a.id.localeCompare(b.id));
            setLogsList(currLogData);
        });

        return unsubscribe;
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList
                data={logsList}
                renderItem={({ item }) => (
                    <SafeAreaView style={styles.itemContainer}>
                        <Text style={styles.heading}>Meal name: {item.foodName}</Text>
                        <Text style={styles.text}>Calories: {item.calories}</Text>
                        <Text style={styles.text}>Carbs: {item.carbs}</Text>
                        <Text style={styles.text}>Fats: {item.fats}</Text>
                        <Text style={styles.text}>Protein: {item.protein}</Text>
                        <Text style={styles.text}>Serving: {item.serving}</Text>
                    </SafeAreaView>
                )}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    );
};

export default LogHistory;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '69%',
    },

    itemContainer: {
        borderColor: 'gray',
        borderWidth: 1,
        backgroundColor: '#fff',
        borderRadius: 15,
        margin: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    text: {
        fontSize: 16,
        textAlign: 'center',
    },
});

