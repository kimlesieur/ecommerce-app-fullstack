import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/Footer";
import Homepage from "../features/homepage/Homepage";
import Product from "../features/product/Product";
import Cart from "../features/cart/Cart";
import Account from '../features/account/Account';
import Register from '../components/Register';
import Checkout from '../components/checkout/Checkout';



function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path='/commande/checkout'><Checkout/></Route>
          <Route exact path='/produit/:id'><Product/></Route>
          <Route exact path='/panier'><Cart/></Route>
          <Route exact path='/account'><Account/></Route>
          <Route exact path='/register'><Register/></Route>
          <Route path='/:category?'><Homepage /></Route>
          
        </Switch>
        <Footer />
      </div>
    </Router>

  );
}

export default App;

