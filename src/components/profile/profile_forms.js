import React from 'react';
import {FormGroup,FormControl, Col, ControlLabel} from 'react-bootstrap'
import './profile.css';

const FormFields = ({formdata,change,id}) => {

    const showError = () => {
        let errorMessage = null;
        if(formdata.validation && !formdata.valid){
            errorMessage = (
                <div className="errorr">
                    {formdata.validationMessage}
                </div>
            )
        }
        return errorMessage;
    }
 
    const renderTemplate = () => {
        let formTemplate = null;

        switch(formdata.element){
            case('input'):
                formTemplate = (
                    <div className="input">
                        <FormGroup controlId="formHori">
                            <Col componentClass={ControlLabel} className="label" sm={1} style={{color:"white"}}>
                            {formdata.config.name}
                            </Col>
                            <Col mdPush={1} sm={11}>
                            <FormControl
                              {...formdata.config}
                              
                            value={formdata.value}
                            onBlur = {(event) => change ({event, id, blur:true})}
                            onChange={(event) => change ({event, id, blur:false})}
                              /> <FormControl.Feedback />
                            </Col>
                      </FormGroup>
                        {showError()}
                    </div>
                )
            break;
            case('email'):
                formTemplate = (
                    <div className="input">
                        <FormGroup controlId="formHori">
                            <Col componentClass={ControlLabel} className="label" sm={1} style={{color:"white"}}>
                            {formdata.config.name}
                            </Col>
                            <Col mdPush={1} sm={11}>
                            <FormControl
                              {...formdata.config}
                                value={formdata.value}
                              /> <FormControl.Feedback />
                            </Col>
                      </FormGroup>
                        {showError()}
                    </div>
                )
            break;
            default:
            formTemplate = null;
        }
        return formTemplate;
    }
    return(
        <div>
            {renderTemplate()}
        </div>
    )
}

export default FormFields; 