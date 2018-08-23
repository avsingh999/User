import React from 'react';
import {firebase} from '../../firebase';
import {Image, Row, Grid, Col} from 'react-bootstrap'

const home = (props) =>{
  
    return(
        <div>
            <h2 style={{
                color:'white',
                fontWeight:'300'
            }}>Dashboard</h2>
                <Grid>    
                    <Row className="show-grid">
                        <Col sm={5}  md={5}  xs={7}>
                        <div
                            onClick = {()=>{
                                firebase.auth().signOut()
                                .then(() => {
                                    props.history.push('/')
                                })
                            }}
                            
                            style={{
                                padding:"15%",
                                marginLeft:"30%",
                                marginTop:"10%",

                                cursor:"pointer",
                                display:"inline-block",
                                
                                
                            }}
                        ><Image  src="data:image/png;base64,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" circle />
                            <h1 style={{color:"#fff", fontWeight:"300",marginLeft:"10%"}}>Log out</h1>
                        </div>
                    </Col>
                    <Col sm={5}  md={5}  xs={7}>
                            <div
                                onClick = {()=>{ 
                                        props.history.push('/profile')
                                    }
                                }
                                style={{
                                    padding:"15%",
                                    marginLeft:"30%",
                                    marginTop:"10%",
                                    cursor:"pointer",
                                    display:"inline-block"
                                }}
                            >
                                <Image  src="data:image/png;base64,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" circle/>
                                <h1 style={{color:"#fff", fontWeight:"300",marginLeft:"23%"}}>Profile</h1>
                            </div>:
                        </Col>
                    </Row>
                </Grid>
        </div>
    )
}

export default home;