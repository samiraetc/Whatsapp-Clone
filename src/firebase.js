import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyA-EMOXcjmEx0CdJkN47qpWS6JqMmqlTG4',
  authDomain: 'whatsapp-clone-br.firebaseapp.com',
  databaseURL: 'https://whatsapp-clone-br.firebaseio.com',
  projectId: 'whatsapp-clone-br',
  storageBucket: 'whatsapp-clone-br.appspot.com',
  messagingSenderId: '728362469321',
  appId: '1:728362469321:web:f8f4db233ad501ac6e0a18',
  measurementId: 'G-22WHCZD1VP',
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
