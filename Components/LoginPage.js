import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, Alert, KeyboardAvoidingView} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './TabNavigator';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'; 
import { firebase } from '../AppConfiguration/config';
import { CheckBox } from 'react-native-elements';


// image
import cal from '../assets/Login_icons/calculator.png';
import google_logo from '../assets/Login_icons/search.png';

const Stack = createStackNavigator();
const firestore = firebase.firestore();


function LoginPage({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);

  const handleCheckButton = () => {
    setChecked(!checked);
  }

  
  const handlePress = () => {
    setEmail('');
    setPassword('');
    setChecked(false);
    handleLogin();
  }

  

  const handleLogin = () => {
    const auth = getAuth();
    //Firebase
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("YOU LOGGED IN CHECK SOMETHING ELSE");

        firestore.collection("userdata").doc(user.uid).get().then((doc) => {   
 
          console.log("Within the collection method");
          
          navigation.navigate('TabNavigator', { doc: doc.data() });
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert('Unable to Login In','Incorrect username or password');
      });
  };



  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'}}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1, marginLeft: 35}}>
          <Image source={cal} style={{width: 100, height: 100, marginBottom: 50}}/>
        </View>
       
        <View style={{flex: 2, paddingTop: 30}}>
          <Text style={{fontWeight: 'bold', fontSize: 35}}>MacroMate</Text>
        </View>
      </View>

      
      <TextInput
        style={styles.input} 
        placeholder="Username" 
        onChangeText={setEmail} 
        value={email}

      />
      <TextInput
        style={[styles.input, {paddingBottom: 5}]}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />

      <View style={{paddingRight: 150}}>
        <CheckBox
        checked={checked}
        onPress={handleCheckButton}
        title='Remember Me'
        checkedIcon='check-square'
        uncheckedIcon='square'
        checkedColor='#007bff'
        containerStyle={{borderWidth: 0, backgroundColor: 'white'}}
        />
      </View>

      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 9, marginLeft: 60}}>
          <TouchableOpacity style={[styles.button, {width: 210}]} onPress={() => handlePress()}>
            <Text style={[styles.loginText, {fontSize: 18}]}>Login</Text>
          </TouchableOpacity>
        </View>
       
          <Text style={{flex: 1, fontSize: 18, fontWeight: 'bold', marginRight: 15, marginTop: 5}}>OR</Text>
        
        <View style={{flex: 1, marginRight: 60}}>
          
          <TouchableOpacity onPress={()=> console.log('Sign up with google')}>
            <Image source={google_logo} style={{width: 35, height: 35}}/>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{marginTop: 20}}>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={[styles.loginText, {color: 'black', textDecorationLine: 'underline', fontWeight: 'bold', fontSize: 18}]}>or Create an account</Text>
        </TouchableOpacity>
      </View>

   
      
    </View>
  );
}


function SignUpPage ({ navigation })
{
   
  const[firstName, setFirstName] = useState('');
  const[lastName, setLastName] = useState('');
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  
  
  const [inputValues, setInputValues] = useState(['', '', '', '']);
  const[inputStyle, setInputStyle] = useState([styles.input, styles.input, styles.input, styles.input]);

  const handleInputChange = (text, index) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = text;
    setInputValues(newInputValues);
  
    if(inputStyle[index].borderColor == 'red'){
      handleStyleChange(styles.input, index)
    }
  };

  const handleStyleChange = (style, index) => 
  {
    const newStyle = [...inputStyle];
    newStyle[index] = style
    setInputStyle(newStyle);
  };

  
  const isValidEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  }

  


  const handlePress = () => {
    console.log(inputValues)
    let emptyIndex = -1;
    for (let i = 0; i < inputValues.length; i++) {
      if (inputValues[i].trim() === '') 
      {
        emptyIndex = i;
        break;
      }
    }

    if (emptyIndex === -1) 
    {
      // All fields are filled
      if(!isValidEmail(inputValues[2]))
      {
        Alert.alert('Invalid Email', 'Please type a valid email');
        handleStyleChange(styles.input_invalid, 2);
        handleInputChange('', 2)
      }

      else if(inputValues[3].length < 5)
      {
        Alert.alert('Invalid Password Length', 'Password must be 5 characters or longer');
        handleStyleChange(styles.input_invalid, 3);
        handleInputChange('', 3)
      }

      else
      {
        handleSignUP(inputValues[2], inputValues[3]);
      }
    } 
    
    else 
    {
      // Empty field found at index emptyIndex
      //console.log(`Empty field found at index ${emptyIndex}`);
      handleStyleChange(styles.input_invalid, emptyIndex);
      
      if(emptyIndex == 0)
      {
        Alert.alert('First name missing', 'Please input your first name');
      }

      else if(emptyIndex == 1)
      {
        Alert.alert('Last name missing', 'Please input your last name');
      }

      else if(emptyIndex == 2)
      {
        Alert.alert('Email missing', 'Please input your email');
      }

      else if(emptyIndex == 3)
      {
        Alert.alert('Password missing','Please input your password')
        
      }
    }

  }
  
  function handleSignUP(email, password, firstName) {
    try {
      const auth = getAuth();
  
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          const userid = user.uid;
          try {
            console.log("going to try to create document");
            const db = firebase.firestore();
            // Add a new document in collection "userdata"
            await db.collection("userdata").doc(userid).set({
              name: inputValues[0],
              calories: 2000,
              dailyGoal: 2400,
            });
            console.log('New user document created with ID:', userid);
  
            const newUserDoc = await db.collection("userdata").doc(userid).get();
            navigation.pop();
          } catch (error) {
            console.error('Error creating user document:', error);
            return;
          }
          console.log("made it here");
            console.log("Within the collection method");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert('Error signing up');
        });
    } catch (error) {
      console.error('Error getting auth:', error);
      return;
    }
  }
  
  return(
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'}}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1, marginLeft: 35}}>
          <Image source={cal} style={{width: 100, height: 100, marginBottom: 50}}/>
        </View>
       
        <View style={{flex: 2, paddingTop: 30}}>
          <Text style={{fontWeight: 'bold', fontSize: 35}}>MacroMate</Text>
        </View>
      </View>

      <TextInput
        style={[inputStyle[0], {paddingBottom: 5}]}
        placeholder="First Name"
        onChangeText={(text) => handleInputChange(text, 0)}
        value={inputValues[0]}
      />

      <TextInput
        style={[inputStyle[1], {paddingBottom: 5}]}
        placeholder="Last Name"
        onChangeText={(text) => handleInputChange(text, 1)}
        value={inputValues[1]}
      />
      
      <TextInput
        style={[inputStyle[2], {paddingBottom: 5}]}
        placeholder="Email"
        onChangeText={(text) => handleInputChange(text, 2)}
        value={inputValues[2]}
      />

      <TextInput
        style={[inputStyle[3], {paddingBottom: 5}]}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => handleInputChange(text, 3)}
        value={inputValues[3]}
      />

      <View style={{marginTop: 25}}>
        <TouchableOpacity style={[styles.button, {height: 40}]} onPress={() => handlePress()}>
          <Text style={[styles.loginText, {fontSize: 18, marginTop: 8}]}>Sign up with Email</Text>
        </TouchableOpacity>
      </View>
      <Text style={{marginTop: 25, fontSize: 17}}>_____________{'    '}or sign up with{'    '}_____________</Text>
      <TouchableOpacity onPress={()=> console.log('Sign up with google')}>
        <Image source={google_logo} style={{width: 40, height: 40, marginTop: 20}}/>
      </TouchableOpacity>
    </View>
    </KeyboardAvoidingView>
  );
  }

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
    width: 300,
    margin: 15
  },

  input_invalid: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
    width: 300,
    margin: 15,
    borderColor: 'red'
  },

  button: {
    backgroundColor: '#3966BC',
    width: 285,
    height:35,
  },

  loginText: {
    textAlign: 'center',
    color: 'white',
    marginTop: 5, 
  }

});


export default MainStackNavigator;

/**
 * <View style={{flexDirection: 'row'}}>
        <View style={{flex: 0}}>
          <TextInput
            style={[styles.input, {width: 175}]} 
            placeholder="First Name" 
            onChangeText={setEmail} 
            value={email}
          />
        </View>

        <View style={{flex: 2}}> 
          <TextInput
            style={[styles.input, {width: 175}]} 
            placeholder="First Name" 
            onChangeText={setEmail} 
            value={email}
          />
        </View>
        
      </View>
 */
