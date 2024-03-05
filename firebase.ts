// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; // for authentication
import 'firebase/compat/firestore'; // for cloud firestore
import 'firebase/compat/storage'; // for cloud storage
import 'firebase/compat/analytics'; // for analytics
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDjeoQCzW0HaeCZDlxSWpI29TZamlhnwKo",
    authDomain: "matloop-33263.firebaseapp.com",
    projectId: "matloop-33263",
    storageBucket: "matloop-33263.appspot.com",
    messagingSenderId: "401761765219",
    appId: "1:401761765219:web:b35135a642a628edf3b556",
    measurementId: "G-21HCBHXVBL"
};

firebase.initializeApp(firebaseConfig);


export default firebase;