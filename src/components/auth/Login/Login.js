import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../../context/context';
import axios from 'axios';
import serverProxy from '../../../config';
import './Login.css'

const Login = (props) => {

    const [ email, setEmail ] = useState(null);
    const [ password, setPassword ] = useState(null);
    const [ loginErrorMessage, setLoginErrorMessage ] = useState(null)


    const history = useHistory();
    const { userData, setUserData } = useContext(UserContext);

    console.log(userData, '----login-----')


    const submitForm = async (event) => {
        event.preventDefault();
       const loginFormData = {
           email: email,
           password: password,
       }
       try {                 
            //log user in
            const loginRes = await axios.post(`${serverProxy}/auth/login`, loginFormData);
            if(loginRes.data){
                setUserData({
                    token: loginRes.data.data.token,
                    user: loginRes.data.data.user
                });
                localStorage.setItem('token', loginRes.data.data.token);
                history.push('/')
            }              
                  
       } catch (error) {
          // network error
           if(error.response === undefined){
               return setLoginErrorMessage(null)
           }
           if(error.response.data.message){
               setLoginErrorMessage(error.response.data.message);
           }         
       }
    }

    //initialize form classes
    let loginClass = "form-control form-input-bordercolor";
       
    //add error/success class and display error message
    if(loginErrorMessage){ 
        const loginErrorClass = 'is-invalid';
        const loginErrorArr = loginClass.split(' ');
        loginErrorArr.push(loginErrorClass)
        loginClass = loginErrorArr.join(' ');
    }

    return ( 
        <div className="container">
            <div className="auth-form col-md-6 col-sm-12 col-12">
            <div className="form-heading">
               <h4>Login</h4>
            </div>

            <form id="loginform" className="main-form" onSubmit={submitForm} noValidate>                         
               <div className="form-group">
                  <div className="form-row">
                    <div className="col-md-12 mb-3">
                    <label htmlFor="validationServer05">Email <span className="impt">*</span></label>
                    <input 
                        type="text" 
                        name="email" 
                        className={loginClass}
                        id="validationServer05"
                        onChange={(e) => setEmail(e.target.value)}  
                    />
                    <div id="validationServer01Feedback" className="invalid-feedback">                     
                        {loginErrorMessage}
                     </div>
                    </div>
                  </div>   
                </div>   

                <div className="form-group">
                  <div className="form-row">
                    <div className="col-md-12 mb-3">
                    <label htmlFor="validationServer03">Password <span className="impt">*</span></label>
                    <input 
                        type="password" 
                        name="password" 
                        className={loginClass}  
                        id="validationServer03"
                        onChange={(e) => setPassword(e.target.value)}
                     />               
                    </div>
                  </div> 
                </div>               
                        
               <div className="form-group">
                <div className="form-row">
                <div className="col-md-12 mb-3">
                    <button className="btn btn-dark col-md-12" type="submit" id="authButton">Login</button>
                </div>
                </div>              
            </div>
            </form>    
        </div>        
     </div>
     );
}
 
export default Login;