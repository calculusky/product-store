import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../../context/context';
import axios from 'axios';
import serverProxy from '../../../config';
import './Signup.css'

const Signup = (props) => {

    // const [ formData, setFormData ] = useState({
    //     firstname: '',
    //     lastname: '',
    //     email: '',
    //     password: '',
    //     confirmpassword: '',
    //     identitycode: ''
    // });

    const [ firstname, setFirstname ] = useState('');
    const [ lastname, setLastname ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmpassword, setConfirmpassword ] = useState('');
    const [ identitycode, setIdentitycode ] = useState('');

    //validations
    const [ validationErrors, setValidationErrors ] = useState(false)


    const history = useHistory();
    const { userData, setUserData } = useContext(UserContext);


    const submitForm = async (event) => {
        event.preventDefault();
       const newUser = {
           firstname,
           lastname,
           email,
           password,
           confirmpassword,
           identitycode
       }
       try {
           const regRes = await axios.post(`${serverProxy}/auth/signup`, newUser);
           if(regRes.data){
               //log user in
               const loginRes = await axios.post(`${serverProxy}/auth/login`, {
                   email: email,
                   password: password
               });
               if(loginRes.data){
                   setUserData({
                       token: loginRes.data.data.token,
                       user: loginRes.data.data.user
                   });
                   localStorage.setItem('token', loginRes.data.data.token);
                   history.push('/')
               }              
           }
           
       } catch (error) {
           if(error.response === undefined){
            return setValidationErrors(null)
           }
           if(error.response.data.validationErrors){
               setValidationErrors(error.response.data.message);
           }         
       }
    }

    //initialize form classes
    let 
        initialClass = "form-control form-input-bordercolor",
        firstnameClass = initialClass,
        lastnameClass = initialClass,
        emailClass = initialClass,
        passwordClass = initialClass,
        confirmPasswordClass = initialClass, 
        identityClass = initialClass;

    //initialize error messages
    let
        initialErrorMessage = null,
        firstnameErrorMessage = initialErrorMessage,
        lastnameErrorMessage = initialErrorMessage,
        emailErrorMessage = initialErrorMessage,
        passwordErrorMessage = initialErrorMessage,
        confirmPasswordErrorMessage =  initialErrorMessage,
        identityErrorMessage = initialErrorMessage;
     

    //add error/success class and display error message
    if(validationErrors){ 
        //check firstname 
        const isFirstnameError = validationErrors.find(e => e.param === 'firstname')    
        const addFirstnameClass = isFirstnameError ? 'is-invalid' : 'is-valid';
        const firArr = firstnameClass.split(' ');
        firArr.push(addFirstnameClass)
        firstnameClass = firArr.join(' ');
        firstnameErrorMessage = isFirstnameError && isFirstnameError.msg;

        //check lastname
        const isLastnameError = validationErrors.find(e => e.param === 'lastname') 
        const addLastnameClass = isLastnameError ? 'is-invalid' : 'is-valid';
        const lasArr = lastnameClass.split(' ');
        lasArr.push(addLastnameClass)
        lastnameClass = lasArr.join(' ');
        lastnameErrorMessage = isLastnameError && isLastnameError.msg


        //check email
        const isEmailError =  validationErrors.find(e => e.param === 'email');
        const addEmailClass = isEmailError ? 'is-invalid' : 'is-valid';
        const emailArr = emailClass.split(' ');
        emailArr.push(addEmailClass)
        emailClass = emailArr.join(' ');
        emailErrorMessage = isEmailError && isEmailError.msg;

        //check password
        const isPasswordError = validationErrors.find(e => e.param === 'password');
        const addPasswordClass = isPasswordError ? 'is-invalid' : 'is-valid';
        const passArr = passwordClass.split(' ');
        passArr.push(addPasswordClass)
        passwordClass = passArr.join(' ');

        //check confirm password
        const isConfirmPasswordError = validationErrors.find(e => e.param === 'confirmpassword');
        const addConfirmPasswordClass = isConfirmPasswordError ? 'is-invalid' : 'is-valid';
        const confirmPassArr = confirmPasswordClass.split(' ');
        confirmPassArr.push(addConfirmPasswordClass)
        confirmPasswordClass = confirmPassArr.join(' ');
        confirmPasswordErrorMessage = isConfirmPasswordError && isConfirmPasswordError.msg;

        //check adminID
        const isIdentityError = validationErrors.find(e => e.param === 'identitycode');
        const addIdentityClass = isIdentityError ? 'is-invalid' : 'is-valid';
        const idArr = identityClass.split(' ');
        idArr.push(addIdentityClass)
        identityClass = idArr.join(' ');
        identityErrorMessage = isIdentityError && isIdentityError.msg

    }

    return ( 
        <div className="container">
            <div className="auth-form col-md-9">
            <div className="form-heading">
            <h4>Product Store Signup</h4>
            </div>

            <form id="signupform" className="main-form" onSubmit={submitForm} noValidate>          
                <div className="form-group">
                <div className="form-row">
                    <div className="col-md-6 mb-3">
                    <label htmlFor="validationServer01">First name <span className="impt">*</span></label>
                    <input 
                        type="text" 
                        name="firstname" 
                        className={firstnameClass}
                        id="validationServer01"
                        onChange={(e) => setFirstname(e.target.value)} 
                        /> 
                        <div id="validationServer01Feedback" className="invalid-feedback">                     
                            {firstnameErrorMessage}
                        </div>
                    </div>

                    <div className="col-md-6 mb-3">
                    <label htmlFor="validationServer02">Last name <span className="impt">*</span></label>
                    <input 
                        type="text" 
                        name="lastname" 
                        className={lastnameClass}
                        id="validationServer02" 
                        onChange={(e) => setLastname(e.target.value)}
                        />
                        <div id="validationServer01Feedback" className="invalid-feedback">                     
                            {lastnameErrorMessage}
                        </div>
                    </div>
                </div>  
                </div>
                
                <div className="form-group">
                <div className="form-row">
                    <div className="col-md-6 mb-3">
                    <label htmlFor="validationServer03">Password <span className="impt">*</span></label>
                    <input 
                        type="password" 
                        name="password"
                        placeholder="alphanumeric characters only" 
                        className={passwordClass}  
                        id="validationServer03"
                        onChange={(e) => setPassword(e.target.value)}
                     /> 
                     <div id="validationServer01Feedback" className="invalid-feedback">                     
                        {passwordErrorMessage}
                     </div>              
                    </div>

                    <div className="col-md-6 mb-3">
                    <label htmlFor="validationServer04">Confirm Password <span className="impt">*</span></label>
                    <input 
                        type="password" 
                        name="confirmpassword" 
                        className={confirmPasswordClass}
                        id="validationServer04"
                        onChange={(e) => setConfirmpassword(e.target.value)} 
                    />
                    <div id="validationServer01Feedback" className="invalid-feedback">                     
                        {confirmPasswordErrorMessage}
                     </div>
                    </div>
                </div> 
                </div>
                
                <div className="form-group">
                <div className="form-row">
                    <div className="col-md-6 mb-3">
                    <label htmlFor="validationServer05">Email <span className="impt">*</span></label>
                    <input 
                        type="text" 
                        name="email" 
                        className={emailClass}
                        id="validationServer05"
                        onChange={(e) => setEmail(e.target.value)}  
                    />
                    <div id="validationServer01Feedback" className="invalid-feedback">                     
                        {emailErrorMessage}
                     </div>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="validationServer06">Admin ID</label>
                      <input 
                        type="text" 
                        name="identitycode" 
                        className={identityClass}
                        id="validationServer06"
                        onChange={(e) => setIdentitycode(e.target.value)} 
                      />
                      <div id="validationServer01Feedback" className="invalid-feedback">                     
                        {identityErrorMessage}
                     </div>
                    </div>
                </div>   
                </div>   
                        
            <div className="form-group">
                <div className="form-row">
                <div className="col-md-12 mb-3">
                    <button className="btn btn-dark col-md-12" type="submit" id="authButton">Signup</button>
                </div>
                </div>              
            </div>
            </form>    
        </div>        
     </div>
     );
}
 
export default Signup;