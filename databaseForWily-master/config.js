import * as firebase from 'firebase'
require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyC46proyTyyNaCDnN__aYBTL8MiBQ89VsI",
  authDomain: "library-transaction.firebaseapp.com",
  projectId: "library-transaction",
  storageBucket: "library-transaction.appspot.com",
  messagingSenderId: "776081241144",
  appId: "1:776081241144:web:d4796be561787ac856a2cd"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();
