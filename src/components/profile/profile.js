import React, { Component } from 'react';
import FormField from './profile_forms';
import {  firebase, firebaseUsers } from '../../firebase'
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {Button,FormGroup,Grid,Row,  Col, ControlLabel,} from 'react-bootstrap'

class Dashboard extends Component {
    state = {
        postError:'',
        loading:false,
        formdata:{
             username:{
                element:'input',
                value:'',
                config:{
                    name:'username',
                    type:'text',
                    placeholder:'enter your username'
                },
                validation:{
                    required:true,
                },
                valid:false,
                touched:false,
                validationMessage:'',
                iconMessage:''
            },
            email:{
                element:'email',
                value:this.props.user.email,
                config:{
                    name:'email',
                    type:'text',
                    placeholder:'enter your username'
                },
                validation:{
                    required:true,
                },
                valid:true,
                touched:false,
                validationMessage:'',
                iconMessage:'success'
            },
            fname:{
                element:'input',
                value:'',
                config:{
                    name:'first name',
                    type:'text',
                    placeholder:'enter your first name'
                },
                validation:{
                    required:true,
                },
                valid:false,
                touched:false,
                validationMessage:'',
                iconMessage:''
                
            },
            lname:{
                element:'input',
                value:'',
                config:{
                    name:'last name',
                    type:'text',
                    placeholder:'enter your last name'
                },
                validation:{
                    required:true,
                },
                valid:false,
                touched:false,
                validationMessage:'',
                iconMessage:''
            },
            dob:moment(),  
            sex:'',
                      
            address:{
                element:'input',
                value:'',
                config:{
                    name:'address',
                    type:'text',
                    placeholder:'enter your address'
                },
                validation:{
                    required:true,
                },
                valid:false,
                touched:false,
                validationMessage:'',
                iconMessage:''
            },
            
            mob:{
                element:'input',
                value:'',
                config:{
                    name:'mob.',
                    type:'text',
                    placeholder:'enter your mobile'
                },
                validation:{
                    required:true,
                },
                valid:false,
                touched:false,
                validationMessage:'',
                iconMessage:''
            },
            bio:{
                element:'input',
                value:'',
                config:{
                    name:'bio',
                    type:'text',
                    placeholder:'bio......'
                },
                validation:{
                    required:true,
                },
                valid:false,
                touched:false,
                validationMessage:'',
                iconMessage:''
            }
        }
    }

    updateForm = (element, content='') => {

        const newFormdata = {
            ...this.state.formdata
        }
        const newElement = {
            ...newFormdata[element.id]
        }

        if(content === ''){
            newElement.value = element.event.target.value
        } else{
            newElement.value = content
        }

        if(element.blur) {
            let validData = this.validate(newElement);
            newElement.valid = validData[0];
            newElement.validationMessage = validData[1];
            newElement.iconMessage = validData[2]
        }
        
        newElement.touched = element.blur;
        newFormdata[element.id] = newElement;
        this.setState({
            formdata:newFormdata
        })
    }
    

    validate = (element) => {
        let error = [true, '', ''];
        if(element.validation.required){
            const valid = element.value.trim() !=='';
            const message1 = `${!valid ? 'This is reuierd':''}`
            const message2 = `${!valid ? 'error':'success'}`
            error = !valid ? [valid, message1, message2] : error
        }
        return error;
    }

    sumbitForm = (event, type) => {
        event.preventDefault();
        let dataToSumbit = {};
        let formIsValid = true;
        for(let key in this.state.formdata ) {
            if(key==='sex'){
                dataToSumbit[key]=this.state.formdata.sex;
            }
            if(key==='dob'){
                const d = new Date(this.state.formdata.dob['_d'])
                var month =d.getMonth() + 1;
                var day = (d .getDate());
                var year = (d .getFullYear());
                const real = day+'/'+month+'/'+year;
                dataToSumbit['DATEOFBIRTH']=real
            }
            if(key!=='sex' && key!=='dob')
                dataToSumbit[key] = this.state.formdata[key].value;
        }
        
        for(let key in this.state.formdata){
            if(key==='dob' || key ==='sex'){
                continue
            }
            else
                formIsValid = this.state.formdata[key].valid && formIsValid;
        }

        if(formIsValid){
            this.setState({
                loading:true,
                postError:''
            })
            firebaseUsers.orderByChild("id")
            .limitToLast(1).once('value')
            .then( snapshot => {
                let articleId = null;
                snapshot.forEach(childSnapshot => {
                    articleId = childSnapshot.val().id
                })
                console.log(articleId)
                dataToSumbit['date'] = firebase.database.ServerValue.TIMESTAMP
                dataToSumbit['id'] = articleId+1
                dataToSumbit['dobs'] = this.state.formdata.dob['_d']
                dataToSumbit['email'] = this.props.user.email;
                
                firebaseUsers.push(dataToSumbit)
                .then( () => {
                    this.props.history.push('/dashboard')
                    
                }).catch(e=>{
                    this.setState({
                        postError:e.message
                    })
                })
            })   
        }
        else{
            this.setState({
                postError:'Something went wromg'
            })
        }
    }

    sumbitButtons = () => (
        this.state.loading ? 
        <div className="element"></div>
        :
        <div>
             <FormGroup>
                <Col smOffset={2} sm={10}>
                <Button bsStyle="primary" type="sumbit" onClick={(event)=>this.sumbitForm(event, true)}>Proceed </Button>
                </Col>
            </FormGroup>
        </div>
    )

    sumbitError = () => {
        
        this.state.postError !== '' ?
        alert(this.state.postError)
        :
        ''
    }
 
    handleDoBChange(date) {
        const d = new Date(date['_d'])
        this.setState({
          dob:date
        });
      }
 
      onChange = (event) => {
          this.state.formdata.sex = event.target.value;
          console.log(this.state.formdata.sex)
      }

      handleChange =( address) => {
        this.setState({ address });
      };
    
      

     render(){
        return(
            <div >
                <form className="profile" onSubmit={(event)=>this.sumbitForm(event, null)}>
                <Grid>
                    <h2 style={{color:"white"}}>My Profile</h2>
                        <Row>
                           <Col sm={6} md={12}  xs={7}>
                                <FormField
                                    id={'email'}
                                    formdata={this.state.formdata.email}
                                    value = {this.props.user.email}
                                    /> 
                            </Col>
                        </Row>
                        <Row className="show-grid">
                                <Col sm={6} md={12} xs={7}>
                                <FormField
                                id={'username'}
                                formdata={this.state.formdata.username}
                                change={(element)=>this.updateForm(element)}
                                />
                            </Col>
                        </Row>
                        <Row className="show-grid">
                            <Col sm={6} md={12}  xs={7}>
                            <FormField
                            id={'fname'}
                            formdata={this.state.formdata.fname}
                            change={(element)=>this.updateForm(element)}
                            />
                            </Col>
                            
                        </Row>
                        <Row>
                            <Col sm={6} md={12}  xs={7}>
                                <FormField
                                    id={'lname'}
                                    formdata={this.state.formdata.lname}
                                    change={(element)=>this.updateForm(element)}
                                    /> 
                            </Col>
                        </Row>  
                    <div className="data">
                        <Row>
                            <Col sm={6} md={10} mdPush={3} xs={7}> 
                            <FormGroup controlId="formHori" >
                                    <Col componentClass={ControlLabel} sm={5} md={10}  xs={10} style={{color:"white"}}>
                                    DOB: 
                                    </Col>
                                    <DatePicker
                                        selected={this.state.dob}
                                        onChange={this.handleDoBChange.bind(this)}
                                        className="red-border"
                                         placeholderText="Click to select a date" 
                                        dateFormat="DD-MM-YYYY"
                                    />  
                            </FormGroup>      
                            </Col>
                        </Row>
                    </div>
                    <div className="data">
                        <Row>
                            <Col sm={1} md={5} mdPush={3} xs={4}>
                                <FormGroup controlId="formHori" >
                                    <Col componentClass={ControlLabel} sm={1} md={2} style={{color:"white"}}>
                                    Male
                                    </Col>
                                
                                    <input type="radio"  name="radio" value = "M" onChange={ this.onChange }/>
                            
                                </FormGroup>
                            </Col>
                        
                            <Col sm={6} md={5}  xs={4}>
                                <FormGroup controlId="formHori" >
                                    <Col componentClass={ControlLabel} sm={1} md={2} style={{color:"white"}}>
                                    Female
                                    </Col>
                                   
                                    <input type="radio" name="radio" value="F" onChange={ this.onChange }></input>
                                </FormGroup>
                            </Col>
                        </Row>
                        
                    </div>
                   
                    <Row>
                        <Col sm={6} md={12}  xs={7}>
                            <FormField
                                id={'mob'}
                                formdata={this.state.formdata.mob}
                                change={(element)=>this.updateForm(element)}
                                />
                        </Col>
                    </Row>
                    <Row>
                             <Col sm={6} md={12}  xs={7}>
                                    <FormField
                                id={'address'}
                                formdata={this.state.formdata.address}
                                change={(element)=>this.updateForm(element)}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6} md={12}  xs={7}>
                                <FormField
                            id={'bio'}
                            formdata={this.state.formdata.bio}
                            change={(element)=>this.updateForm(element)}
                            />
                            </Col>
                        </Row>  
                        <Row>
                            <Col sm={6} md={12}  xs={7}>
                             { this.sumbitButtons() }
                            </Col>
                        </Row>     
                </Grid>
                </form>
                     <Grid>
                     <Row className="show-grid">
                            <Col sm={6} md={12}  xs={7}>
                            { this.sumbitError() }
                            </Col>
                        </Row>
                    </Grid>;
            </div>
        )
    }
}

export default Dashboard;