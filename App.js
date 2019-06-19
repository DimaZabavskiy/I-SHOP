"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import combinedReducer from './redux/reducers.js';

import { BrowserRouter } from 'react-router-dom';

import PagesLinks from './components/PagesLinks';
import PagesRouter from './components/PagesRouter';
import Footer from './Footer';

import './App.css'


let store=createStore(combinedReducer, applyMiddleware(thunk));

ReactDOM.render( 
  
  <BrowserRouter>
    <Provider store={store}>
      <div className='App' >
        <PagesLinks />
        <PagesRouter />
        <Footer />
      </div>
    </Provider>
  </BrowserRouter>
, document.getElementById('container') );
