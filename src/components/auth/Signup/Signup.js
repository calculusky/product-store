import React from 'react';
import './Signup.css'

const Signup = () => {
    return ( 
        <div class="container">
            <div class="auth-form col-md-9">
            <div class="form-heading">
            <h4>Product Store Signup</h4>
            </div>
            <form id="signupform" class="main-form" action="/admin/signup" method="POST" novalidate>          
                <div class="form-group">
                <div class="form-row">
                    <div class="col-md-6 mb-3">
                    <label for="validationServer01">First name <span class="impt">*</span></label>
                    <input 
                        type="text" 
                        name="firstname" 
                        class="form-control form-input-bordercolor
                            <% if(validationErrors.length > 0) { %>
                            <%= validationErrors.find(e => e.param === 'firstname') ? 'is-invalid': 'is-valid' %>
                            <% } %>" 
                        id="validationServer01" 
                        // value="<%= oldInputs.firstname %>">
                        // <% if(validationErrors.find(e => e.param === 'firstname')){ %>
                        // <% const message = validationErrors.find(e => e.param === 'firstname') %> 
                        // <div id="validationServer01Feedback" class="invalid-feedback">                     
                        //     <%= message.msg %> 
                        // </div>
                        // <% } %> 
                        />
                    </div>
                    <div class="col-md-6 mb-3">
                    <label for="validationServer02">Last name <span class="impt">*</span></label>
                    <input 
                        type="text" 
                        name="lastname" 
                        class="form-control form-input-bordercolor
                            <% if(validationErrors.length > 0) { %>
                            <%= validationErrors.find(e => e.param === 'lastname') ? 'is-invalid': 'is-valid' %>
                            <% } %>" 
                        id="validationServer02" 
                        // value="<%= oldInputs.lastname %>">
                        // <% if(validationErrors.find(e => e.param === 'lastname')){ %>
                        // <% const message = validationErrors.find(e => e.param === 'lastname') %> 
                        // <div id="validationServer01Feedback" class="invalid-feedback">                     
                        //     <%= message.msg %> 
                        // </div>
                        // <% } %>
                        /> 
                    </div>
                </div>  
                </div>
                
                <div class="form-group">
                <div class="form-row">
                    <div class="col-md-6 mb-3">
                    <label for="validationServer03">Password <span class="impt">*</span></label>
                    <input 
                        type="password" 
                        name="password"
                        placeholder="alphanumeric characters only" 
                        class="form-control form-input-bordercolor"  
                        id="validationServer03"
                        // value="<%= oldInputs.password %>">
                        // <% if(validationErrors.find(e => e.param === 'password')){ %>
                        // <% const message = validationErrors.find(e => e.param === 'password') %> 
                        // <div id="validationServer01Feedback" class="invalid-feedback">                     
                        //     <%= message.msg %> 
                        // </div>
                        // <% } %>
                        />               
                    </div>

                    <div class="col-md-6 mb-3">
                    <label for="validationServer04">Confirm Password <span class="impt">*</span></label>
                    <input 
                        type="password" 
                        name="confirmpassword" 
                        class="form-control form-input-bordercolor
                            <% if(validationErrors.length > 0) { %>
                            <%= validationErrors.find(e => e.param === 'confirmpassword') ? 'is-invalid': 'is-valid' %>
                            <% } %>" 
                        id="validationServer04" 
                        // value="<%= oldInputs.confirmpassword %>">
                        // <% if(validationErrors.find(e => e.param === 'confirmpassword')){ %>
                        // <% const message = validationErrors.find(e => e.param === 'confirmpassword') %> 
                        // <div id="validationServer01Feedback" class="invalid-feedback">                     
                        //     <%= message.msg %> 
                        // </div>
                        // <% } %> 
                        />
                    </div>
                </div> 
                </div>
                
                <div class="form-group">
                <div class="form-row">
                    <div class="col-md-6 mb-3">
                    <label for="validationServer05">Email <span class="impt">*</span></label>
                    <input 
                        type="text" 
                        name="email" 
                        class="form-control form-input-bordercolor
                            <% if(validationErrors.length > 0) { %>
                            <%= validationErrors.find(e => e.param === 'email') ? 'is-invalid': 'is-valid' %>
                            <% } %>" 
                        id="validationServer05" 
                        // value="<%= oldInputs.email %>">
                        // <% if(validationErrors.find(e => e.param === 'email')){ %>
                        // <% const message = validationErrors.find(e => e.param === 'email') %> 
                        // <div id="validationServer01Feedback" class="invalid-feedback">                     
                        //     <%= message.msg %> 
                        // </div>
                        // <% } %> 
                        />
                    </div>

                    <div class="col-md-6 mb-3">
                      <label for="validationServer06">Admin ID</label>
                      <input 
                        type="text" 
                        name="identitycode" 
                        class="form-control form-input-bordercolor
                            <% if(validationErrors.length > 0) { %>
                            <%= validationErrors.find(e => e.param === 'identitycode') ? 'is-invalid': 'is-valid' %>
                            <% } %>" 
                        id="validationServer06" 
                        // value="<%= oldInputs.identitycode %>">
                        /* <% if(validationErrors.find(e => e.param === 'identitycode')){ %>
                        <% const message = validationErrors.find(e => e.param === 'identitycode') %> 
                        <div id="validationServer01Feedback" class="invalid-feedback">                     
                            <%= message.msg %> 
                        </div>
                        <% } %>  */
                        />
                    </div>
                </div>   
                </div>    
                        
            <div class="form-group">
                <div class="form-row">
                <div class="col-md-12 mb-3">
                    <button class="btn btn-dark col-md-12" type="submit" onclick="clickedAuthButton(event)" id="authButton">Signup</button>
                </div>
                </div>              
            </div>
            </form>    
        </div>        
     </div>
     );
}
 
export default Signup;