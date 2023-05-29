import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDRxCPNv2PM5x6JVs460_Bu-_elIy6NUDQ",
    authDomain: "meet-bfa68.firebaseapp.com",
    projectId: "meet-bfa68",
    storageBucket: "meet-bfa68.appspot.com",
    messagingSenderId: "75721735535",
    appId: "1:75721735535:web:742763992259f0c7c47c9a"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();