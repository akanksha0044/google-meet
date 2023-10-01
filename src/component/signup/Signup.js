import React from 'react'
import { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import { auth } from '../../lib/firebase';
import { useHistory } from 'react-router-dom';
import './signup.css'


const intialFormData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};


function Signup({ showSignup }) {
  const toggleSignUp = (e) => {
    e.preventDefault();
    showSignup(false);
  }
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(intialFormData);
  const [passwordError, setPasswordError] = useState({ state: false, msg: "" });
  const [emailError, setEmailError] = useState({ state: false, msg: "" });
  const history = useHistory();
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const error = formData.password === formData.confirmPassword;

  const createAccount = (e) => {
    if (formData.password.length < 6) {
      setPasswordError({
        state: true,
        msg: "Password should be at least 6 characters",
      });
      return;
    }

    if (!validEmail) {
      setEmailError({
        state: true,
        msg: "Email address is not properly formatted",
      });
      setFormData({ ...formData, email: "" });
      return;
    }

    auth.createUserWithEmailAndPassword(formData.email, formData.password)
      .then(async () => {
        try {
          await auth.currentUser.updateProfile({
            displayName: `${formData.firstName} ${formData.lastName}`,
          });
          // Profile update successful
          console.log("Profile updated successfully");
        } catch (error) {
          // Handle profile update error
          console.error("Error updating profile: ", error);
        }
      })
      .catch((error) => {
        // Handle account creation error
        console.error("Error creating account: ", error);
      });

    if (!error) {
      setPasswordError({ state: true, msg: "Passwords do not match" });
      setFormData({ ...formData, confirmPassword: "" });
      return;
    } else {
      setEmailError({ state: false, msg: "" });
      setPasswordError({ state: false, msg: "" });
      history.push('/');
    }
  };

  const handleCheckboxChange = () => {
    setShowPassword(!showPassword);
  }

  const buttonDisabled =
    !formData.email ||
    !formData.password ||
    !formData.firstName ||
    !formData.lastName ||
    !formData.confirmPassword;


  return (
    <div >
      <Container className='cnt mt-5'>
        <div className='row'>
          <div className='col-md-6'>
            <img src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
              alt="Google" className='singimg mt-5' />
            <h6>Create your Google Account</h6>
            <p>Continue to Gmail</p>
            <div className='row'>
              <div className='col-sm-6'>
                <input type='text' className='form-control' value={formData.firstName} onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value, })}
                  placeholder='first name' />
              </div>
              <div className='col-sm-6'>
                <input type='text' className='form-control' value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value, })}
                  placeholder='last name' />
              </div>
            </div>
            <input type='email' className='form-control mt-1' value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData, email: e.target.value,
                })
              }
              placeholder='email' />
            {emailError.state && (<div className="error">{emailError.msg}</div>)}
            <div className='row mt-1'>
              <div className='col-sm-6'>
                <Form.Control type={showPassword ? 'text' : 'password'} className={`form-control ${passwordError.state ? 'is-invalid' : ''}`}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    })
                  }
                  placeholder='Password' />
                {passwordError.state && (
                  <div className="invalid-feedback">{passwordError.msg}</div>
                )}
              </div>
              <div className='col-sm-6'>
                <Form.Control type={showPassword ? 'text' : 'password'} className={`form-control ${passwordError.state ? 'is-invalid' : ''}`}
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  placeholder='Confirm Password' />
                {passwordError.state && (
                  <div className="invalid-feedback">{passwordError.msg}</div>
                )}
              </div>
              <div className='col-sm-12 mt-1'>
                <Form.Check className='show-password-checkbox' type='checkbox' label='Show password' onChange={handleCheckboxChange} />
              </div>
            </div>
            <div className='row'>
              <div className='col-sm-6 mt-3'>
                <a href='#' className='text-decoration-none ' onClick={toggleSignUp}>Sign in instead</a>
              </div>
              <div className='col-sm-6 mt-2'>
                <button type="button" className="btn btn-primary" onClick={createAccount}
                  disabled={buttonDisabled}
                >Create</button>
              </div>
            </div>

          </div>
          <div className='col-md-6 mt-4'>
            <img src="https://ssl.gstatic.com/accounts/signup/glif/account.svg"
              alt="account" className='img2' />
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Signup
