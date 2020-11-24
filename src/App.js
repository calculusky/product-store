import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation/Navigation';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Products from './components/store/Products/Products';
import Signup from './components/auth/Signup/Signup';
import Login from './components/auth/Login/Login';
import CreateProductPage from './containers/CreateProductPage/CreateProductPage';
import UserContext from './context/context';
import axios from 'axios';

function App() {
  const [ userData, setUserData ] = useState({
    token: null,
    user: null
  })

  useEffect(() => {
     let token = localStorage.getItem('token');
     if(token === null){
       localStorage.setItem('token', '')
       token = '';
     }
    const checkIfLoggedIn = async () => {
      const getUser = await axios.post('http://localhost:4000/auth/getuser', null, {
        headers: {
          'authorization': 'Bearer ' + token,
        }
      });
      if(getUser.data.success){
        setUserData({
          token: token,
          user: getUser.data.data
        })
      }
    }
    checkIfLoggedIn();
  }, [])
  
  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Navigation/> 
          <Switch>
            <Route exact path="/" component={Products} /> 
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/addproduct" component={CreateProductPage} />
          </Switch>
        </UserContext.Provider>
      </BrowserRouter>      
    </div>
  );
}

export default App;
