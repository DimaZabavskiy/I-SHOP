import React from 'react';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import {add_from_logalstorage} from '../redux/basketAC';
import './PagesLinks.css';

class BasketNavlink extends React.PureComponent {
 
    componentWillMount () {
        if (this.props.basket.chosenProduct.length == 0 && JSON.parse(localStorage.chosenProduct).length > 0) {
        this.props.dispatch(add_from_logalstorage (JSON.parse(localStorage.chosenProduct)) );
        }
    }
    //style={{backgroundColor: 'lightgreen', color:'red', width: '20px',
    //textAlign: 'center', display: 'inline-block'}}

    render () {
        let count = 0;
        if (this.props.basket.chosenProduct.length > 0) {
            let product = [...this.props.basket.chosenProduct];
            
            for (let i = 0; i < product.length; i++) {
                count += product[i].count;
            }
        }
        return (
            <NavLink to="/basket" className="PageLink" activeClassName="ActivePageLink">
                Корзина
                {this.props.basket.chosenProduct.length?<span>{count}</span>:null}
            </NavLink>
        )
    }
}

const mapStateToProps = function (state) {
    return {
      basket: state.basket,
    };
  };
  
export default connect(mapStateToProps)(BasketNavlink);