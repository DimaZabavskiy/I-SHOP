import React from 'react';
import { NavLink } from 'react-router-dom'
import BasketCount from './BasketCount';

import './PagesLinks.css';


class PagesLinks extends React.Component {

  state = {
    menu: false,
  }

  showMenu = () => {
    this.setState ({
      menu: true,
    })
  } 
  cancelMenu = () => {
    this.setState ({
      menu: false,
    })
  } 
          
  render() {
    console.log('render PagesLinks');

    let showMenu;

    this.state.menu ? ( showMenu = 'PageLinkHidden' ) : ( showMenu = 'PageLink')

    return (
      <div className='Links'>
        <NavLink to="/" exact className={showMenu} activeClassName="ActivePageLink">Главная</NavLink>
        <NavLink to="/products" className={showMenu} activeClassName="ActivePageLink">Продукты</NavLink>
        <NavLink to="/registration" className={showMenu} activeClassName="ActivePageLink">Личный кабинет</NavLink>
        <NavLink to="/basket" className={showMenu} activeClassName="ActivePageLink">
            Корзина
           <BasketCount />
        </NavLink>
        {this.state.menu ? 
          <div className = "ShowMenu" onClick={this.cancelMenu}>
            <div>X</div>
          </div> :
          <div className = 'BurgerMenu' onClick={this.showMenu} >
            <img src='https://i.ibb.co/y48t3P1/iconfinder-menu-alt-134216.png' />
          </div>
        }
        
      </div>
    );
    
  }

}
    

export default PagesLinks;