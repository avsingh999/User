import React, { Component } from "react";
import './mainPage.css';
import {Grid, Row,Col} from 'react-bootstrap'


const MainPage= (props) => {
    return(
        <div className="logContainer" >
                        <Grid>
                            
                            <Row className="show-grid">
                                <Col sm={5}  md={5}  xs={7}>
                                <div onClick = {()=>{
                                    props.history.push('/login')
                        
                                    }}
                                    className="dot"
                                    
                                    >
                                     <h2 style={{
                                         color:"#000",
                                         padding:"4%",
                                         marginTop:"40%",
                                         fontWeight:"300",
                                         cursor:"pointer"

                                     }}>Login</h2>
                                </div>
                                
                            </Col>
                            
                            <Col sm={5} md={5}  xs={7}>
                                <div onClick = {()=>{
                                    props.history.push('/register')
                                    }}
                                    className="dot"
                                    >
                                     <h2 style={{
                                         color:"#000",
                                         padding:"4%",
                                         marginTop:"40%",
                                         fontWeight:"400",
                                         cursor:"pointer"

                                     }}>Sign Up</h2>
                                </div>
                            </Col>
                            
                            </Row>
                            
                        </Grid>
                                    
                            

        </div>
    )
}

export  default MainPage;
