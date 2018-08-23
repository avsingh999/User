import React, { Component } from 'react';
import './layout.css';

const Layout =(props) => {

        return(
            <div>
                {props.children}
            </div>
        )
    
}

export default Layout; 