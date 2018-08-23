import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyCarjSYgBVfmVE7sPDdbQ8llwKscbngn7Q",
    authDomain: "home-f03c2.firebaseapp.com",
    databaseURL: "https://home-f03c2.firebaseio.com",
    projectId: "home-f03c2",
    storageBucket: "home-f03c2.appspot.com",
    messagingSenderId: "832082931653"
  };
firebase.initializeApp(config);

const firebaseDB = firebase.database();
const firebaseUsers = firebaseDB.ref('users');


const firebaselooper = (snapshot) => {
    const data = [];
    snapshot.forEach((childSnapshot)=> {
        data.push({
            ...childSnapshot.val(),
            id:childSnapshot.key
        })
    });
    return data
}

export {
    firebase,
    firebaseDB,
    firebaseUsers,
 
    firebaselooper
}