import React, { useState} from "react";
import { Container,  Form,} from 'react-bootstrap';
import Signup from "../signup/Signup";
import './login.css';
import {auth} from '../../lib/firebase';
import { useHistory } from "react-router-dom";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSignup, setShowSignup] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  

  const toggleSignUp=(e)=>{
    
    e.preventDefault();
    setShowSignup(true);
  }
  

    
  const history = useHistory();
  const login = (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email, password).then(() => {
      setEmailError("");
      setPasswordError("");
      history.push("/");
      
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorCode === "auth/user-not-found") {
        setEmailError("Email address not found");
      } else {
        setEmailError("");
      }

      if (errorCode === "auth/wrong-password") {
        setPasswordError("Incorrect password");
      } else {
        setPasswordError("");
      }
    });
  };
    
    
  return (
    <div>
      {
        showSignup ?(
          <Signup showSignup={setShowSignup}/>
        ):(<Container className="my-container mt-5">
        <img src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
                alt="Google" className='loginimg mt-5'/>
        <h6 className=' fs-15 mt-2'>Sign In</h6>
        <p>Use your Google Account</p>
        
        <Form.Group className='d-flex justify-content-center'>
          
          
          <Form.Control type="text" className='mt-3' style={{ width: 300 }}
           value={email}
           onChange={(e) => setEmail(e.target.value)}
           placeholder="email or phone" />
          </Form.Group>
          {emailError && (
              <div className="error-message">{emailError}</div>
            )}
          <Form.Group className='d-flex justify-content-center'>
          
          
          <Form.Control type="password" className='mt-3' style={{ width: 300 }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
           placeholder="password" />
          </Form.Group>
          {passwordError && (
              <div className="error-message">{passwordError}</div>
            )}
        <p className="mt-3">
              <a href="#" className='text-decoration-none'>Forgot password?</a>
            </p>
            <p className="mt-3">Not your computer? Use Guest mode to sign in privately <a href="#" className='text-decoration-none'>Learn More</a>
            </p>
            <div className='row mt-4'>
              <div className='col-md-6'>
                  <p><a href='#' className='text-decoration-none' onClick={toggleSignUp}>Create account</a></p>
              </div>
              <div className='col-md-6'>
              <button type="button" className="btn btn-primary" onClick={login}>Sign In</button>
              </div>
  
            </div>
      </Container>)}
      
    </div>
  )
}

export default Login
