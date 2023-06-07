import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCrCOfuS6ExdbJRRoY6lkVS-4DwP2z3DsU",
  authDomain: "crud2023-c1313.firebaseapp.com",
  databaseURL: "https://crud2023-c1313-default-rtdb.firebaseio.com",
  projectId: "crud2023-c1313"
};

if (!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export default firebase;