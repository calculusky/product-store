import React from 'react';
import Navigation from './components/Navigation/Navigation';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Products from './components/store/Products/Products';
import Register from './components/auth/Register/Register';
import Login from './components/auth/Login/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
         <Navigation/> 
         <Switch>
           <Route exact path="/" component={Products} /> 
           <Route path="/Register" component={Register} />
           <Route path="/Login" component={Login} />
         </Switch>
      </BrowserRouter>      
    </div>
  );
}

export default App;
