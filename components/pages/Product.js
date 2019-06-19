import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';
import {addToBasketAC} from '../../redux/basketAC';

import './Product.css';

class Product extends React.PureComponent {

  addToBasket = () => {
    this.props.dispatch(addToBasketAC(this.props.info));
  }

  render() {
    console.log('render Product');
    
    return (

      <div className='wrapper'>

        <div className='productImage'>
          <img src={this.props.info.image} />
        </div>

        <div className='productDescription'>
          
          <NavLink to={"/product/"+this.props.info.id} className="Link" >
            { this.props.info.name }
          </NavLink>
          <br />
          <br />
          <span>Цена: {this.props.info.cost} рублей!</span>
          <br />
          <br />
          <span>Вес: {this.props.info.weight}</span> 
          <br />
          <br />
          <button onClick={this.addToBasket}>В корзину</button>

        </div>

      </div>

    );

  }

}

const mapStateToProps = function (state) {
  return {
    basket: state.basket,
  };
};

export default connect(mapStateToProps)(Product);
