import { Alert, SafeAreaView, Text, StyleSheet, ScrollView, TouchableOpacity, View, Button} from 'react-native';
import masterstyle from '../../MasterStyles/masterstyle';
import {StackActions, useNavigation} from '@react-navigation/native';
import { getAuth, signOut } from "firebase/auth";
//import { Updates } from 'expo';
// import * as Updates from 'expo-updates';
	
export default function Settings() {

  const navigation = useNavigation();

  const darkMode = () => {
    masterstyle.defaultBackground = 'black';
    console.log('darkmode');
  };

  const lightMode = () => {

  };

  const handleReset = async () => {
    await Updates.reloadAsync();
  };   

  const doUserLogOut = async function () {
    try{
    const auth = getAuth();
    await signOut(auth);
        Alert.alert('Success!', 'No user is logged in anymore!');
        await Updates.reloadAsync();
        return true;
      }
      catch(error) {
        Alert.alert('Error!', error.message);
        return false;
      }
  };


  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <SafeAreaView>
          <Text style={styles.disclaimer}>We are not liable for any damages or unwanted outcomes that may result from using our application. Use it at your own risk. If you need nutritional advice, please consult a medical professional.
          </Text>
        </SafeAreaView>
        <SafeAreaView>
          <Text style={styles.copyright}>Copyright © 2023 Juan Tiguila, Jonathon Dooley, Jennifer Lizarraga, Josue
            Martinez, Sahis Neupane, Sripranav Pinjala, and Jacky Man</Text>
        </SafeAreaView>
      </SafeAreaView>
    </ScrollView>
  );
}



const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignContent: 'center',
    flex: 1,
    marginLeft:100,
    marginRight:100,
    paddingLeft:100,
    paddingRight:100,
  },

  disclaimer: {
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 230,
    color: 'red',
    alignContent: 'flex-end',
    fontSize: 12,
  },

  copyright: {
    textAlign: 'center',
    fontSize: 11,
    alignContent: 'flex-end',
    paddingBottom: 20,
    paddingTop: 20,
    fontStyle: 'italic', // add this line?
  },

  row: {
    padding: 20
  }
});

// import { SafeAreaView, Text, StyleSheet, ScrollView, TouchableOpacity, View, Button} from 'react-native';
// import masterstyle from '../../MasterStyles/masterstyle'
// import MainStackNavigator from '../LoginPage';

// function Settings({ navigation }) {
//   const darkMode = () => {
//     masterstyle.defaultBackground = 'black';
//     console.log('darkmode');
//   };
  
//   const lightMode = () => {
//   };

//   // New
//   const handlePress = () => {
//     navigation.navigate('MainStackNavigator', { screen: 'Login' });
//   }  
  
//   return (
//     <ScrollView>
//       <SafeAreaView style={masterstyle.defaultBackground}>

//         <View style={styles.row}>
//           <Button
//             title="Dark"
//             onPress={darkMode}
//           />
//         </View>

//         <View style={styles.row}>
//           <Button
//             title="Light"
//           />
//         </View>

//         <SafeAreaView>
//           <TouchableOpacity style={styles.logOut} onPress={() => handlePress()}>
//             <Text style={styles.LogoutText}>Log out</Text>
//           </TouchableOpacity>
//         </SafeAreaView>

//         <SafeAreaView>
//           <Text style={styles.disclaimer}>We are not liable for any damages or unwanted outcomes that may result from using our application. Use it at your own risk. If you need nutritional advice, please consult a medical professional.
//           </Text>
//         </SafeAreaView>

//         <SafeAreaView>
//           <Text style={styles.copyright}>Copyright © 2023 Juan Tiguila, Jonathon Dooley, Jennifer Lizarraga, Josue
//             Martinez, Sahis Neupane, Sripranav Pinjala, and Jacky Man</Text>
//         </SafeAreaView>

//       </SafeAreaView>
//     </ScrollView>
//   );
// }


// // New
// function SettingsStackNavigator() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>

//         // Settings page.
//         <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
        
//         // Go to Login page.
//         <Stack.Screen name="MainStackNavigator" component={MainStackNavigator} options={{ headerShown: false }} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default SettingsStackNavigator;

// const styles = StyleSheet.create({
//   container: {
//     justifyContent: 'center',
//     alignContent: 'center',
//     flex: 1,
//   },
//   logOut: {
//     marginTop: 40,
//     textAlign: 'center',
//     marginRight: 8,
//     marginLeft: 8,
//     justifyContent: 'center',
//     alignContent: 'center',
//     borderBottomWidth: 1,
//     borderRightWidth: 1,
//     borderBottomColor: 'green',
//     borderRightColor: 'red',
//     borderRadius: 33,
//     padding: 15,
//   },
//   LogoutText: {
//     textShadowColor: 'green',
//     textAlign: 'center',
//     fontWeight: 'bold',
//     fontSize: 15,
//   },

//   disclaimer: {
//     paddingLeft: 25,
//     paddingRight: 25,
//     paddingTop: 230,
//     color: 'red',
//     alignContent: 'flex-end',
//     fontSize: 12,
//   },

//   copyright: {
//     textAlign: 'center',
//     fontSize: 11,
//     alignContent: 'flex-end',
//     paddingBottom: 20,
//     paddingTop: 20,
//     fontStyle: 'italic', // add this line?
//   },

//   row: {
//     padding: 20
//   }
// });
