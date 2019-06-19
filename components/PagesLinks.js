import React from 'react';
import { NavLink } from 'react-router-dom'
import {connect} from 'react-redux';
import {add_from_logalstorage} from '../redux/basketAC';

import './PagesLinks.css';


class PagesLinks extends React.Component {

  componentWillMount () {
      if (this.props.basket.chosenProduct.length == 0 && JSON.parse(localStorage.chosenProduct).length > 0) {
        this.props.dispatch(add_from_logalstorage (JSON.parse(localStorage.chosenProduct)) );
      }
  }
          
  render() {
    console.log('render PagesLinks');
    let count = 0;
    if (this.props.basket.chosenProduct.length > 0) {
        let product = [...this.props.basket.chosenProduct];
        
        for (let i = 0; i < product.length; i++) {
            count += product[i].count;
        }
    }

    return (
      <div className='Links'>
        <NavLink to="/" exact className="PageLink" activeClassName="ActivePageLink">Главная</NavLink>
        <NavLink to="/products" className="PageLink" activeClassName="ActivePageLink">Продукты</NavLink>
        <NavLink to="/registration" className="PageLink" activeClassName="ActivePageLink">Личный кабинет</NavLink>
        <NavLink to="/basket" className="PageLink" activeClassName="ActivePageLink">
            Корзина
            {this.props.basket.chosenProduct.length?<span className='BasketCount'>{count}</span>:null}
        </NavLink>
      </div>
    );
    
  }

}
    
const mapStateToProps = function (state) {
  return {
    basket: state.basket,
  };
};

export default connect(mapStateToProps)(PagesLinks);