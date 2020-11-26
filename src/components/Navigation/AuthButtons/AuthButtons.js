import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import { useHistory } from 'react-router-dom';
import './AuthButtons.css'

const AuthButton = () => {
    const history = useHistory();
    const login = () => {
        history.push('/login');
    }
    const signup = () => {
        history.push('/signup');
    }

    return ( 
        <Aux>
            <button className="my-2 my-sm-0 AuthButtons" onClick={login}>Login</button>
            <button className="my-2 my-sm-0 AuthButtons" onClick={signup}>Signup</button>
        </Aux>
     );
}
 
export default AuthButton;