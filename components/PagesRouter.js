import React from 'react';
import { Route } from 'react-router-dom';
import '../App.css'

import Page_Start from './pages/Page_Start';
import Page_Products from './pages/Page_Products';
import Page_Product from './pages/Page_Product';
import Page_Basket from './pages/Page_Basket';
import Page_Registration from './pages/Page_Registration';

class PagesRouter extends React.Component {
          
    render() {
      console.log('render PagesRouter');
  
      return (
        <div className='Route'>
          <Route path="/" exact component={Page_Start} />
          <Route path="/products" component={Page_Products} />
          <Route path="/product/:clid" component={Page_Product} />
          <Route path="/registration" component={Page_Registration} />
          <Route path="/basket" component={Page_Basket} />
        </div>
      );
      
    }
  
  }
      
  export default PagesRouter;