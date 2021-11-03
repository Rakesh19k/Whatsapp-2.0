import firebase from "firebase/app";
import "firebase/firestore"
import "firebase/auth"



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBGcXpbP7hR_yy0ou0i3bnGby7XEBk5dV8",
    authDomain: "whatsapp-2-432fb.firebaseapp.com",
    projectId: "whatsapp-2-432fb",
    storageBucket: "whatsapp-2-432fb.appspot.com",
    messagingSenderId: "953935308288",
    appId: "1:953935308288:web:0143ba815f6dc539c1dae5"
};

const app = !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app();


const db = app.firestore();
const auth = app.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };

