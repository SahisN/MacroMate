import React from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// import screens
import ProfilePage from '../ProfileComponents/PersonalInformation';
import Goals from '../ProfileComponents/Goals';
import Help from '../ProfileComponents/Help';
import Settings from '../ProfileComponents/Settings';

//import LoginPage from '../../Components/LoginPage';


//firebase logout
import { firebase } from '../../AppConfiguration/config';





// function ProfileItems({ navigation }) {
//     return (
//         <ScrollView>
//             <View style={styles.container}>
//                 <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('Goals')}>
//                     <Text style={styles.content}>{'Goals'} {'>'}</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('ProfilePage')}>
//                     <Text style={styles.content}>{'Profile'} {'>'}</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('Settings')}>
//                     <Text style={styles.content}>{'Settings'} {'>'}</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('Help')}>
//                     <Text style={styles.content}>{'Help'} {'>'}</Text>
//                 </TouchableOpacity>

//             </View>
//         </ScrollView>
//     );
// }


   //firebase logout
function ProfileItems({ navigation }) {
    const logout = () => {
        firebase.auth().signOut().then(() => {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        }).catch((error) => {
            Alert.alert('Logout failed', 'There was an error while trying to log out.');
        });
    }


//function ProfileItems({ navigation }) {  //comment in this line for old logout
    return (
        <ScrollView>
            <View style={styles.container}>
                <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('Goals')}>
                    <Text style={styles.content}>{'Goals'} {'>'}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('ProfilePage')}>
                    <Text style={styles.content}>{'Profile'} {'>'}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('Settings')}>
                    <Text style={styles.content}>{'Settings'} {'>'}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('Help')}>
                    <Text style={styles.content}>{'Help'} {'>'}</Text>
                </TouchableOpacity>
                
                {/* //old logout
                <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.content}>{'Log out'}</Text>
                    </TouchableOpacity>  
                */}
                  {/* //firebase logout */}  
                <TouchableOpacity style={styles.row} onPress={logout}>
                    <Text style={styles.content}>{'Log out'}</Text>                  
                </TouchableOpacity>
                
                  
            </View>
        </ScrollView>
    );
}



const Stack = createStackNavigator();

function ProfileStack() {
    return (
            <Stack.Navigator initialRouteName='ProfileItems'>
                <Stack.Screen name='Main' component={ProfileItems} options={{ headerShown: false }} />
                <Stack.Screen name='Goals' component={Goals} />
                <Stack.Screen name='ProfilePage' component={ProfilePage} />
                <Stack.Screen name='Settings' component={Settings} />
                <Stack.Screen name='Help' component={Help} />

            </Stack.Navigator>
    )
}

const styles = StyleSheet.create({


    container: {
        justifyContent: 'center',
        alignContent: 'center',
        flex: 1,
    },

    row: {
        flexDirection: 'column',
        height: 90,
        margin: 8,
        justifyContent: 'center',
        alignContent: 'center',
        borderColor: '#CCCCCC',
        borderWidth: 0.2,
        borderRadius: 15,
    },

    content: {
        marginLeft: 10,
        fontSize: 20,
        marginRight: 10,
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'center',
    },

});


export default ProfileStack;

