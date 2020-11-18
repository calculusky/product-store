import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../context/context';
import Aux from '../../hoc/Auxiliary';
import './Navigation.css'

const Navigation = (props) => {
    const { userData, setUserData } = useContext(UserContext);
    //console.log(userData, 'uuuuddd');

    //check to display user profile or login, signup button
    let authButtonsOrProfile = (
        <Aux>
            <Link className="btn btn-outline-light my-2 my-sm-0 auth-button" to="/login" role="button">Login</Link>
            <Link className="btn btn-outline-light my-2 my-sm-0 auth-button" to="/signup" role="button">Signup</Link>
        </Aux>
    )
    if(userData.user){
        let userRole = userData.user.role === 'normal' ? userData.user.firstname : `${userData.user.firstname}(Admin)`;
        authButtonsOrProfile = (
            <Aux>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item dropdown">
                        <Link to="#" className="nav-link dropdown-toggle text-white" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {userRole} 
                        </Link>
                        <div className="dropdown-menu navbar-right-dropdown" aria-labelledby="navbarDropdown">
                            <Link className="dropdown-item"to="#">{ userData.user.firstname }</Link>
                            <Link className="dropdown-item"to="/addproduct">New Product</Link>
                            <div className="dropdown-divider"></div>                               
                            <Link className="dropdown-item" to="javascript:void(0)" id="logoutLink">Logout</Link>
                        </div>
                    </li>
                </ul>
            </Aux>
        )
    }

    return ( 
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">  
            <Link to ="/" className="navbar-brand">Product Store</Link>  
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">               
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/products">Products<span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link" to="/addproduct">Create Product<span className="sr-only">(current)</span></Link>
                        </li>
                        {/* <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle text-white"to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Monitoring
                            </Link>
                            <div className="dropdown-menu navbar-custom-dropdown" aria-labelledby="navbarDropdown">
                                <Link className="dropdown-item"to="/monitoring/nodes">Network</Link> 
                            </div>
                        </li> */}
                    </ul>
                    <div className="navbar-right-div">
                        { authButtonsOrProfile }
                    </div>    
            </div>
            
        </nav>
     );
}
 
export default Navigation;