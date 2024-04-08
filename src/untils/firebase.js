import firebase from 'firebase/compat/app';


const firebaseConfig = {
    apiKey: "AIzaSyChbmMhhsvlaR4Fow8ItwWGPJStMJIhcKU",
    authDomain: "wanna-talk-e1162.firebaseapp.com",
    projectId: "wanna-talk-e1162",
    storageBucket: "wanna-talk-e1162.appspot.com",
    messagingSenderId: "716067413661",
    appId: "1:716067413661:web:d660fef91fbe979e837e74"
  };

firebase.initializeApp(firebaseConfig);

export default firebase;