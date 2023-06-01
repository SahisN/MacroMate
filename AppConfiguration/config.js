import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyDucBGu-Xi8O2RL34D9dYQL21MF1MrDB9E",
    authDomain: "group5-2898c.firebaseapp.com",
    databaseURL: "https://group5-2898c-default-rtdb.firebaseio.com",
    projectId: "group5-2898c",
    storageBucket: "group5-2898c.appspot.com",
    messagingSenderId: "331585406034",
    appId: "1:331585406034:web:6ca0aff87a2c58c9fe8b8b",
    measurementId: "G-Z2XH2C97HP"
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };