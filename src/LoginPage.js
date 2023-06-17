import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [userdata, setUserData]=useState({userName: "", password: ""});
    const[errors, setErrors]=useState({});

    const navi=useNavigate();

    const changehandler=(e)=>{
        setUserData({...userdata,[e.target.name]:e.target.value});
    }

    const setField=(field)=>{
        if(!!errors[field]){
            setErrors({...errors,[field]:null});
        }
    }


     const validateForm=()=>{
        const newErrors={};
        if(!userdata.userName || userdata.userName===""){
            newErrors.userName="userName cannot be empty"
        }else if(userdata.userName.length<5){
            newErrors.userName="userName cannot be too short"
        }

        if(!userdata.password || userdata.password===""){
            newErrors.password="Password cannot be empty"
        }


        return newErrors;
     }


    const senddata=(e)=>{
        e.preventDefault();
        console.log(userdata);

        const formErrors=validateForm();

        console.log(formErrors);

        if(Object.keys(formErrors).length>0){
            setErrors(formErrors);
        }else{
            axios({
                method:"POST",
                url:"https://virtullearning.cloudjiffy.net/BitStreamIOLMSWeb/login/v1/userLogin",
                data:userdata
            }).then((res)=>{
                if(res.data.accessToken){
    
                    sessionStorage.setItem("user",JSON.stringify(res.data));
                    navi("/dash");
                    alert("Welcome User");
                }else{
                    alert("Bad Credentials");
                }
            });
            setUserData({userName: "", password: ""});
        }

        
    }
  return (
    <div>
        <Card style={{ width: '18rem', margin:"auto", marginTop:"20px" }}>
      <Card.Img variant="top" src="https://img.freepik.com/free-vector/bird-colorful-gradient-design-vector_343694-2506.jpg" />
      <Card.Body>
      <Form>
      <Form.Group className="mb-3">
        <Form.Label>User Name:</Form.Label>
        <Form.Control type="text" name="userName" placeholder="Enter User Name" value={userdata.userName} onChange={(e)=>{changehandler(e);
        setField("userName");
        }}
        
        isInvalid={!!errors.userName}
        
        />
        <Form.Control.Feedback type="invalid">{errors.userName}</Form.Control.Feedback>

      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name='password'  placeholder="Enter Password" value={userdata.password} onChange={(e)=>{changehandler(e);
        setField("password")
        }} 

         isInvalid={!!errors.password}
        />

        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>

      </Form.Group>
    
      <Button variant="primary" type="submit" onClick={senddata}>
        Submit
      </Button>
    </Form>
        
      </Card.Body>
    </Card>


        
    </div>
  )
}

export default LoginPage