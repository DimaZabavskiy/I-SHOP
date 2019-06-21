import React from 'react';
import {connect} from 'react-redux';
import {add_from_logalstorage} from '../redux/basketAC';

import './PagesLinks.css';


class BasketCount extends React.PureComponent {

  componentWillMount () {
      if (this.props.basket.chosenProduct.length == 0 && JSON.parse(localStorage.chosenProduct).length > 0) {
        this.props.dispatch(add_from_logalstorage (JSON.parse(localStorage.chosenProduct)) );
      }
  }
          
  render() {
    console.log('render BasketCount');
    let count = 0;
    if (this.props.basket.chosenProduct.length > 0) {
        let product = [...this.props.basket.chosenProduct];
        
        for (let i = 0; i < product.length; i++) {
            count += product[i].count;
        }
    }

    return (
        <span className='BasketCount'>
            {this.props.basket.chosenProduct.length?<span>{count}</span>:''}
        </span>
    );
    
  }

}
    
const mapStateToProps = function (state) {
  return {
    basket: state.basket,
  };
};

export default connect(mapStateToProps)(BasketCount);