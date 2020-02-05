import Firebase from 'firebase';
var firebaseConfig = {
  apiKey: "AIzaSyBHXF5WRQt5Wff0MVyYl0qhJD5byZTvnKs",
  authDomain: "rcplk-6b098.firebaseapp.com",
  databaseURL: "https://rcplk-6b098.firebaseio.com",
  projectId: "rcplk-6b098",
  storageBucket: "",
  messagingSenderId: "1043171731264",
  appId: "1:1043171731264:web:076d78c963b1070843fca5"
};

let app = Firebase.initializeApp(firebaseConfig);
export const db = app.database();



