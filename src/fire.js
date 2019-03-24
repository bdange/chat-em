import firebase from 'firebase';
const config = {
   apiKey: "AIzaSyCUFY-nU5V2kIXM7O4iiC5vA3rRbp4xlh0",
   authDomain: "bloc-chat-536ce.firebaseapp.com",
   databaseURL: "https://bloc-chat-536ce.firebaseio.com",
   projectId: "bloc-chat-536ce",
   storageBucket: "bloc-chat-536ce.appspot.com",
   messagingSenderId: "631834485694"
 };
const firebaseApp = firebase.initializeApp(config);
export const auth = firebaseApp.auth();
export const messageRef = firebaseApp.database().ref('messages');
export const roomRef = firebaseApp.database().ref('rooms');
export default firebaseApp;
