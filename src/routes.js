import React from 'react';
import {  Switch } from 'react-router-dom';
import Home from './components/Home/home';
import Layout from './components/Layout/layout';
import mainPage from './components/mainPage/mainPage';
import register from './components/register/register';
import login from './components/login/login';
import PrivateRoutes from './components/AuthRoutes/privateRoutes';
import PublicRoute from "./components/AuthRoutes/public";
import User_Profile from './components/profile/profile'

const Routes = (props) => {
    console.log(props.user+"Routes")
        return(
            <Layout user={props.user}>
                <Switch>                    
                    <PublicRoute {...props} restricted={true} path="/" exact component={mainPage}/>
                    <PublicRoute {...props} restricted={true} path="/login" exact component={login}/>
                    <PublicRoute {...props} restricted={true} path="/register" exact component={register}/>
                    <PrivateRoutes {...props}  path="/profile" exact component={User_Profile}/>
                    <PrivateRoutes {...props} path="/dashboard" exact component={Home}/>
                </Switch>
            </Layout>         
        )
}
 
export default Routes;