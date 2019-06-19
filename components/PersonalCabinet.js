import React from 'react';
import {connect} from 'react-redux';
import {exitFromUserAC} from '../redux/userAC';
import './PersonalCabinet.css'

class PersonalCabinet extends React.Component {

  exitCabinet = () => {
    this.props.dispatch(exitFromUserAC());
  }
          
    render() {
      console.log('render PersonalCabinet');
      let products = [];
      if (this.props.user.user.myProducts.length > 0) {

        for (let i = 0; i < this.props.user.user.myProducts.length; i++) {
          let userProducts = [];
          for (let a = 0; a < this.props.user.user.myProducts[i].products.length; a++) {
            userProducts.push(<div className='personalProduct' key={a}>
            <img src={this.props.user.user.myProducts[i].products[a].image} width='40px' />
            <b>{this.props.user.user.myProducts[i].products[a].name}</b> в количестве {this.props.user.user.myProducts[i].products[a].count} шт. </div>)
          }
          products.push(<div key={i}>{this.props.user.user.myProducts[i].date}
          {userProducts} <hr /></div>)
        }
      } else {
        products = 'Вы еще не оформляли никаких заказов на сайте';
      }
 
      return (
          <div className='PersonalCabinet'>
            <div className='CabinetExit' onClick={this.exitCabinet}>Выйти</div>
            <br />
            <h1>Добро пожаловать, {this.props.user.user.name}!</h1>
            <br />
              <div>
                <h2>Ваши заказы:</h2>
                {products}
              </div>
          </div>
      );
      
    }
  
  }

  
const mapStateToProps = function (state) {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(PersonalCabinet);