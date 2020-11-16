import React from 'react';

const navigation = (props) => {
    return ( 
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">  
            <a class="navbar-brand" href="/">Product Store</a>  
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">               
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <a class="nav-link" href="/products">Products<span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item active">
                            <a class="nav-link" href="/addproduct">Create Product<span class="sr-only">(current)</span></a>
                        </li>
                        {/* <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Monitoring
                            </a>
                            <div class="dropdown-menu navbar-custom-dropdown" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="/monitoring/nodes">Network</a> 
                            </div>
                        </li> */}
                    </ul>
                    <div class="navbar-right-div">
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                   Nedusky (Admin) 
                                </a>
                                <div class="dropdown-menu navbar-right-dropdown" aria-labelledby="navbarDropdown">
                                    <a class="dropdown-item" href="/admin/addsite">Add Site</a>
                                    <a class="dropdown-item" href="#">Add Server</a>
                                    <div class="dropdown-divider"></div>                               
                                    <a class="dropdown-item" href="javascript:void(0)" id="logoutLink">Logout</a>
                                </div>
                            </li>
                        </ul>
                    </div>    
            </div>
            
        </nav>
     );
}
 
export default navigation;