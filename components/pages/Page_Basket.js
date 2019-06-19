import React from 'react';
import {connect} from 'react-redux';
import isoFetch from 'isomorphic-fetch';
import Delivery from '../Delivery';
import Contacts from '../Contacts';
import ChosenProduct from '../ChosenProduct';
import {clear_basket, add_from_logalstorage} from '../../redux/basketAC';
import {add_products_from_basketAC} from '../../redux/userAC';
import './Page_Basket.css';


class Page_Basket extends React.PureComponent {

  state = {
    delivery: false, // отключено, true - включено
    contacts: false, // отключено, true - включено
    ordered: false, // когда заказ будет сделан, будет true
  }

  componentWillMount () {
    if (this.props.basket.chosenProduct.length == 0 && JSON.parse(localStorage.chosenProduct).length > 0) {
      this.props.dispatch(add_from_logalstorage (JSON.parse(localStorage.chosenProduct)) );
    }
  }

  saveName = () => {
    if (this.props.user.user.id) {
      let adress = "http://localhost:3000/users/" + this.props.user.user.id;
      let getDate = new Date ();
      let setDate = getDate.getDate() + '.' + (getDate.getMonth()+1) + '.' + getDate.getFullYear();
  
      isoFetch(adress, {
              method: 'PATCH',
              headers: {
                  "Content-type": "application/json",
              }, body: JSON.stringify({...this.props.user.user, myProducts: [...this.props.user.user.myProducts, {date: setDate,
              products: this.props.basket.chosenProduct}]})
          })
              .then( (response) => { // response - HTTP-ответ
                  if (!response.ok) {
                      let Err=new Error("fetch error " + response.status);
                      Err.userMessage="Ошибка связи";
                      throw Err;
                  }
                  else
                      return response.json();
              })
              .then( (data) => {
                  this.props.dispatch(add_products_from_basketAC(setDate, this.props.basket.chosenProduct));
                  this.props.dispatch(clear_basket());
                  this.setState({
                    ordered: true,
                  })
              })
              .catch( (error) => {
                  console.log('mistake');
                  console.error(error);
              })
          ;  
    } else {
      this.props.dispatch( clear_basket() );
      this.setState({
        ordered: true,
      })
    }
  }

  ShowDelivery = () => {
    this.setState ({
      delivery: true,
    })
  }
  ShowContact = () => {
    this.setState ({
      contacts: true,
    })
  }
          
  render() {
    console.log('render Page_Basket');
    if (this.props.basket.chosenProduct.length == 0 && JSON.parse(localStorage.chosenProduct).length == 0) {
      console.log(1);
      if (this.state.ordered) {
        console.log(3);
        return (<div className='Ordered'>
        <div>Заказ успешно зарегистрирован!</div>
      </div>)
      } else {
        console.log(2);
        return (<div className='Page_Basket'><h2>Ваша корзина пуста</h2></div>)}

      //return <div className='Page_Basket'><h2>Ваша корзина пуста</h2></div>
    }

    let prodName = '';
    let count = 0;
    for (let a = 0; a < this.props.basket.chosenProduct.length; a++) {
      prodName += this.props.basket.chosenProduct[a].name + ' ';
      count += (this.props.basket.chosenProduct[a].count * this.props.basket.chosenProduct[a].cost);
    }

    let basketProduct = this.props.basket.chosenProduct.map(product => {
      return <ChosenProduct key={product.id} info={product} />
    })

    return (
      <div className='Page_Basket'>
        <h2>Ваш заказ:</h2>
        <table>
          <tbody>
          <tr>
            <th>Товар</th>
            <th>Цена</th>
            <th>Количество</th>
            <th></th>
          </tr>
          
            {basketProduct}
          </tbody>
        </table>
        <div className='Total'>Итого: {count} рублей.</div>

        {!this.state.delivery && <div className='ButtonNext'>
          <button onClick={this.ShowDelivery}>Далее</button>
        </div>}

        <hr />
        
        {this.state.delivery && <Delivery cbShowContact={this.ShowContact} />}

        <hr />
        
        {this.state.contacts && <Contacts cbSaveName={this.saveName} />}
        <hr />

        {this.state.ordered && <div className='Ordered'>
          <div>Заказ успешно зарегистрирован!</div>
        </div>}

      </div>

    );
    
  }

}
  

const mapStateToProps = function (state) {
  return {
    user: state.user,
    basket: state.basket,
  };
};

export default connect(mapStateToProps)(Page_Basket);
