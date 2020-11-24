import React from 'react';
import './CreateProduct.css';

const CreateProduct = (props) => {
    return ( 
        <div className="container">
            <div className="auth-form col-md-6 col-sm-12 col-12">
            <div className="form-heading">
               <h4>Add Product</h4>
            </div>

            <form id="addproductform" className="main-form" onSubmit={props.submit} noValidate>                         
               <div className="form-group">
                  <div className="form-row">
                    <div className="col-md-12 mb-3">
                    <label htmlFor="validationServer05">Title<span className="impt">*</span></label>
                    <input 
                        type="text" 
                        name="title" 
                        className="form-control form-input-bordercolor"//{loginClass}
                        id="validationServer05"
                        onChange={props.change}
                        value={props.title}  
                    />
                    {/* <div id="validationServer01Feedback" className="invalid-feedback">                     
                        {loginErrorMessage}
                     </div> */}
                    </div>
                  </div>   
                </div> 

                <div className="form-group">
                  <div className="form-row">
                    <div className="col-md-12 mb-3">
                    <label htmlFor="validationServer05">Price<span className="impt">*</span></label>
                    <input 
                        type="number" 
                        name="price" 
                        className="form-control form-input-bordercolor"//{}
                        id="validationServer05"
                        onChange={props.change}
                        value={props.price}  
                    />
                    {/* <div id="validationServer01Feedback" className="invalid-feedback">                     
                        {loginErrorMessage}
                     </div> */}
                    </div>
                  </div>   
                </div> 

                <div className="form-group">
                  <div className="form-row">
                    <div className="col-md-12 mb-3">
                    <label htmlFor="validationServer05">Image<span className="impt">*</span></label>
                    <input 
                        type="file" 
                        name="image" 
                        className= "form-control form-input-bordercolor"//{loginClass}
                        id="validationServer05"
                        //readOnly
                        //value={props.image}
                        onChange={props.change}  
                    />
                    {/* <div id="validationServer01Feedback" className="invalid-feedback">                     
                        {loginErrorMessage}
                     </div> */}
                    </div>
                  </div>   
                </div>    

                <div className="form-group">
                  <div className="form-row">
                    <div className="col-md-12 mb-3">
                    <label htmlFor="validationServer05">Description<span className="impt">*</span></label>
                    <textarea
                        rows="5"
                        cols="10"
                        type="text" 
                        name="description" 
                        className="form-control form-input-bordercolor"//{}
                        id="validationServer05"
                        onChange={props.change} 
                        value={props.description} 
                    />
                    {/* <div id="validationServer01Feedback" className="invalid-feedback">                     
                        {loginErrorMessage}
                     </div> */}
                    </div>
                  </div>   
                </div>   
                           
                        
               <div className="form-group">
                <div className="form-row">
                <div className="col-md-12 mb-3">
                    <button className="btn btn-dark col-md-12" type="submit" id="authButton">Add Product</button>
                </div>
                </div>              
            </div>
            </form>    
        </div>        
     </div>
     );
}
 
export default CreateProduct;