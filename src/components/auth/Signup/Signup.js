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

    const [ firstname, setFirstname ] = useState(null);
    const [ lastname, setLastname ] = useState(null);
    const [ email, setEmail ] = useState(null);
    const [ password, setPassword ] = useState(null);
    const [ confirmpassword, setConfirmpassword ] = useState(null);
    const [ identitycode, setIdentitycode ] = useState(null);

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
           console.log(error.response.data, 'err*****')
       }
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
                        className="form-control form-input-bordercolor
                            <% if(validationErrors.length > 0) { %>
                            <%= validationErrors.find(e => e.param === 'firstname') ? 'is-invalid': 'is-valid' %>
                            <% } %>" 
                        id="validationServer01"
                        onChange={(e) => setFirstname(e.target.value)} 
                        // value="<%= oldInputs.firstname %>">
                        // <% if(validationErrors.find(e => e.param === 'firstname')){ %>
                        // <% const message = validationErrors.find(e => e.param === 'firstname') %> 
                        // <div id="validationServer01Feedback" className="invalid-feedback">                     
                        //     <%= message.msg %> 
                        // </div>
                        // <% } %> 
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                    <label htmlFor="validationServer02">Last name <span className="impt">*</span></label>
                    <input 
                        type="text" 
                        name="lastname" 
                        className="form-control form-input-bordercolor
                            <% if(validationErrors.length > 0) { %>
                            <%= validationErrors.find(e => e.param === 'lastname') ? 'is-invalid': 'is-valid' %>
                            <% } %>" 
                        id="validationServer02" 
                        onChange={(e) => setLastname(e.target.value)}
                        // value="<%= oldInputs.lastname %>">
                        // <% if(validationErrors.find(e => e.param === 'lastname')){ %>
                        // <% const message = validationErrors.find(e => e.param === 'lastname') %> 
                        // <div id="validationServer01Feedback" className="invalid-feedback">                     
                        //     <%= message.msg %> 
                        // </div>
                        // <% } %>
                        /> 
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
                        className="form-control form-input-bordercolor"  
                        id="validationServer03"
                        onChange={(e) => setPassword(e.target.value)}
                        // value="<%= oldInputs.password %>">
                        // <% if(validationErrors.find(e => e.param === 'password')){ %>
                        // <% const message = validationErrors.find(e => e.param === 'password') %> 
                        // <div id="validationServer01Feedback" className="invalid-feedback">                     
                        //     <%= message.msg %> 
                        // </div>
                        // <% } %>
                        />               
                    </div>

                    <div className="col-md-6 mb-3">
                    <label htmlFor="validationServer04">Confirm Password <span className="impt">*</span></label>
                    <input 
                        type="password" 
                        name="confirmpassword" 
                        className="form-control form-input-bordercolor
                            <% if(validationErrors.length > 0) { %>
                            <%= validationErrors.find(e => e.param === 'confirmpassword') ? 'is-invalid': 'is-valid' %>
                            <% } %>" 
                        id="validationServer04"
                        onChange={(e) => setConfirmpassword(e.target.value)} 
                        // value="<%= oldInputs.confirmpassword %>">
                        // <% if(validationErrors.find(e => e.param === 'confirmpassword')){ %>
                        // <% const message = validationErrors.find(e => e.param === 'confirmpassword') %> 
                        // <div id="validationServer01Feedback" className="invalid-feedback">                     
                        //     <%= message.msg %> 
                        // </div>
                        // <% } %> 
                        />
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
                        className="form-control form-input-bordercolor
                            <% if(validationErrors.length > 0) { %>
                            <%= validationErrors.find(e => e.param === 'email') ? 'is-invalid': 'is-valid' %>
                            <% } %>" 
                        id="validationServer05"
                        onChange={(e) => setEmail(e.target.value)} 
                        // value="<%= oldInputs.email %>">
                        // <% if(validationErrors.find(e => e.param === 'email')){ %>
                        // <% const message = validationErrors.find(e => e.param === 'email') %> 
                        // <div id="validationServer01Feedback" className="invalid-feedback">                     
                        //     <%= message.msg %> 
                        // </div>
                        // <% } %> 
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="validationServer06">Admin ID</label>
                      <input 
                        type="text" 
                        name="identitycode" 
                        className="form-control form-input-bordercolor
                            <% if(validationErrors.length > 0) { %>
                            <%= validationErrors.find(e => e.param === 'identitycode') ? 'is-invalid': 'is-valid' %>
                            <% } %>" 
                        id="validationServer06"
                        onChange={(e) => setIdentitycode(e.target.value)} 
                        // value="<%= oldInputs.identitycode %>">
                        /* <% if(validationErrors.find(e => e.param === 'identitycode')){ %>
                        <% const message = validationErrors.find(e => e.param === 'identitycode') %> 
                        <div id="validationServer01Feedback" className="invalid-feedback">                     
                            <%= message.msg %> 
                        </div>
                        <% } %>  */
                        />
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