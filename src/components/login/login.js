import React, { Component } from "react";
import './login.css';
import { Link } from 'react-router-dom';
import FormField from "../widgets/FormFields/formFields";
import {firebase} from '../../firebase';
import { Button,Form,FormGroup, Col } from 'react-bootstrap';

class SignIn extends Component {

    state = {
        registerError:'',
        loading:false,
        formdata:{
            email:{
                element:'input',
                value:'',
                config:{
                    name:'Email',
                    type:'email',
                    placeholder:'Enter eMail'
                },
                validation:{
                    required:true,
                    email:true
                },
                valid:false,
                touched:false,
                validationMessage:'',
                iconMessage:''

                
            },
            password:{
                element:'input',
                value:'',
                config:{
                    name:'Password',
                    type:'password',
                    placeholder:'Enter password'
                },
                validation:{
                    required:true,
                    password:true
                },
                valid:false,
                touched:false,
                validationMessage:'',
                iconMessage:''
            }
        }
    }

    updateForm = (element) => {
        const newFormdata = {
            ...this.state.formdata
        }
        const newElement = {
            ...newFormdata[element.id]
        }
        newElement.value = element.event.target.value;
        if(element.blur) {
            let validData = this.validate(newElement);
            console.log(validData)
            newElement.valid = validData[0];
            newElement.validationMessage = validData[1];
            newElement.iconMessage = validData[2]
            if(newElement.valid){
                newElement.iconMessage='success'
            }
        }
        newElement.touched = element.blur;
        newFormdata[element.id] = newElement;
        console.log(newFormdata)
        this.setState({
            formdata:newFormdata
        })
    }
    validate = (element) => {
        let error = [true, '',''];
        if(element.validation.email){
            const valid = /\S+@\S+\.\S+/.test(element.value)
            const message1 = `${!valid ? 'Must be valid mail':'valid'}`
            const message2 = `${!valid ? 'error':'valid'}`
            error = !valid ? [valid, message1,message2] : error
        }
        if(element.validation.required){
            const valid = element.value.trim() !=='';
            const message1 = `${!valid ? 'This field is reuired':''}`
            const message2 = `${!valid ? 'warning':''}`
            error = !valid ? [valid, message1,message2] : error
        }
        return error;
    }
    sumbitButtons = () => (
        this.state.loading ? 
        <div className="element"></div>
        :
        <div>
             <FormGroup>
                <Col smOffset={2} sm={10}>
                <Button bsStyle="primary" onClick={(event)=>this.sumbitForm(event, true)}>Login </Button>
                </Col>
                
            </FormGroup>
        </div>
    )

    sumbitForm = (event, type) => {
        event.preventDefault();
        if(type !== null){
            let dataToSumbit = {};
            let formIsValid = true;
            for(let key in this.state.formdata ) {
                dataToSumbit[key] = this.state.formdata[key].value;
            }
            for(let key in this.state.formdata){
                formIsValid = this.state.formdata[key].valid && formIsValid;
            }

            if(formIsValid){
            
                this.setState({
                    loading:true,
                    registerError:''
                })
                if(type){
                    firebase.auth()
                    .signInWithEmailAndPassword(
                        dataToSumbit.email,
                        dataToSumbit.password
                    ).then(()=> {
                        this.props.history.push('/dashboard')
                    }).catch(error=>{
                        this.setState({
                            loading:false,
                        registerError:error.message
                        })
                    })
                }
                
            }
        }
    }

    sumbitError = () => {
        
        this.state.registerError !== '' ?
        <div > { this.state.registerError }</div>
        :
        ''

    }
    render(){
        return(
            <div className="logContainer">
                <h2 >Login</h2>
                <Form horizontal onSubmit={(event)=>this.sumbitForm(event, null)}>
                        <FormField
                        id={"email"}
                        formdata={this.state.formdata.email}
                        change={(element)=>this.updateForm(element)}
                        />
                        <FormField
                        id={"password"}
                        formdata={this.state.formdata.password}
                        change={(element)=>this.updateForm(element)}
                        />
                        { this.sumbitButtons() }
                    
                    { this.sumbitError() }
                    <Link to='/register' exact>don't have a account</Link>

                </Form>

            </div>
            
        )
    }
}

export default SignIn ;









