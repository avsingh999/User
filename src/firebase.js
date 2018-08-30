import * as firebase from 'firebase';

var config = {
//paste your firebase config
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
