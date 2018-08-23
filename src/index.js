import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import {firebase} from './firebase'

const App = (props) => {
    console.log(props+"     index")
    return(
        <BrowserRouter>
        <Routes {...props}/>
        </BrowserRouter>
    )
}

firebase.auth().onAuthStateChanged((user)=>{
    ReactDOM.render(<App user = {user}/>, document.getElementById('root'));

})
