import React from 'react';
import { Link } from 'react-router-dom';

const navigation = (props) => {
    return ( 
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">  
            <Link to ="/" class="navbar-brand">Product Store</Link>  
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">               
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <Link class="nav-link" to="/products">Products<span class="sr-only">(current)</span></Link>
                        </li>
                        <li class="nav-item active">
                            <Link class="nav-link"to="/addproduct">Create Product<span class="sr-only">(current)</span></Link>
                        </li>
                        {/* <li class="nav-item dropdown">
                            <Link class="nav-link dropdown-toggle text-white"to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Monitoring
                            </Link>
                            <div class="dropdown-menu navbar-custom-dropdown" aria-labelledby="navbarDropdown">
                                <Link class="dropdown-item"to="/monitoring/nodes">Network</Link> 
                            </div>
                        </li> */}
                    </ul>
                    <div class="navbar-right-div">
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-item dropdown">
                                <Link to="#" class="nav-link dropdown-toggle text-white" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                   Nedusky (Admin) 
                                </Link>
                                <div class="dropdown-menu navbar-right-dropdown" aria-labelledby="navbarDropdown">
                                    <Link class="dropdown-item"to="/admin/addsite">Add Site</Link>
                                    <Link class="dropdown-item"to="#">Add Server</Link>
                                    <div class="dropdown-divider"></div>                               
                                    <Link class="dropdown-item" to="javascript:void(0)" id="logoutLink">Logout</Link>
                                </div>
                            </li>
                        </ul>
                    </div>    
            </div>
            
        </nav>
     );
}
 
export default navigation;