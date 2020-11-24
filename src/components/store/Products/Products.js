import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios'; 
import UserContext from '../../../context/context';
import serverProxy from '../../../config';

const Products = () => {
    const { userData, setUserData } = useContext(UserContext);
    console.log(userData, '------uuu------ppp/....')
    const history = useHistory();

   
    useEffect(() => {
        // if(!userData.user) {
        //     console.log(userData.user, '*********uuuu*******')
        //     history.push('/login')
        // }
        //console.log(userData, '------from useeffect....')
        const token = localStorage.getItem('token');
        if(!token){
           return history.push('/login')
        }
        const checkIfLoggedIn = async () => {
            try {
                const getUser = await axios.post(`${serverProxy}/auth/getuser`, null, {
                    headers: {
                        'authorization': 'Bearer ' + token
                    }
                });

                if(!getUser.data.success){
                   return history.push('/login')
                }
                console.log(userData.user, '>>>>>>>')
            } catch (error) {
                history.push('/login')
                console.log(error)
            }
        }
        checkIfLoggedIn()
    });
    return ( 
        <div>
            products
        </div>
     );
}
 
export default Products;