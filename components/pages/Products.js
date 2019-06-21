import React from 'react';
import {connect} from 'react-redux';

import { productsThunkAC } from "../../redux/fetchThunk";

import Product from './Product';
import Category from '../Category';
import './Products.css'


class Products extends React.PureComponent {


  state = {
    sortPrice: null, // сортировка по цене: 'min' - с наименьшей, 'max' - с наибольшей
    search: '',
    getBrand: [],
    getTypeProduct: null,
    setMaxPrice: null,
    setMinPrice: null,
  }


  componentDidMount() {
    if (!this.props.products.data) {
      this.props.dispatch( productsThunkAC(this.props.dispatch) );
    }
  }

  search = (eo) => {
    this.setState({
      search: eo.target.value,
    })
  }

  getBrand = (type) => {
    let add = [];
    if (this.state.getBrand.length == 0) {
      add.push(type);
      this.setState({
        getBrand:add,
      })
    } else {
      add = [...this.state.getBrand];
      for (let i = 0; i < this.state.getBrand.length; i++) {
        if (this.state.getBrand[i] == type) {
          add.splice(i,1);
          this.setState({
            getBrand:add,
          })
          return;
        }
      }
      add.push(type);
      this.setState({
        getBrand:add,
      })
      return;
    }
  }

  getTypeProduct = (type) => {
    if (type == 'Все товары') {
        this.setState({
          getTypeProduct: null,
        })
        return;
    }
    this.setState({
      getTypeProduct: type,
    })
  }

  setMinPrice = (type) => {
    if (type.length == 0) {
        this.setState({
          setMinPrice: null,
        })
        return;
    }
    this.setState ({
      setMinPrice: type,
    })
  }

  setMaxPrice = (type) => {
    if (type.length == 0) {
        this.setState({
          setMaxPrice: null,
        })
        return;
    }
    this.setState ({
      setMaxPrice: type,
    })
  }

  sortMinPrice = () => {
    this.setState({
      sortPrice: 'min',
    });
  }
  sortMaxPrice = () => {
    this.setState({
      sortPrice: 'max',
    });
  }
  compareMin = (a,b) => {
    return a.cost - b.cost;
  }
  compareMax = (a,b) => {
    return b.cost - a.cost;
  }
  
  render() {
    console.log('render Products');
    if ( this.props.products.status<=1 )
      return "загрузка...";

    if ( this.props.products.status===2 )
      return "ошибка загрузки данных";

    let productArray = [];
    let productsCode = [];
    
    for (let i = 0; i < this.props.products.data.length; i++) {
      if (this.state.getBrand.length > 0) { // проверка по производителю
        let num = 0;
        for (let a = 0; a < this.state.getBrand.length; a++) {
          if (this.state.getBrand[a] !=  this.props.products.data[i].brand) {
            num++;
          }
        }
        if (num == this.state.getBrand.length) {
          continue;
        }
      }
      if ((this.state.setMinPrice && this.state.setMinPrice > this.props.products.data[i].cost) ||
        (this.state.setMaxPrice && this.state.setMaxPrice < this.props.products.data[i].cost)) {
          continue;
        }
      if (this.props.products.data[i].name.toLowerCase().indexOf(this.state.search.toLowerCase()) == -1) {
        continue;
      }
      if (this.state.getTypeProduct && this.state.getTypeProduct !=this.props.products.data[i].type){
        continue;
      }

      productArray.push(this.props.products.data[i]);
    }
    
    if (this.state.sortPrice == 'min') {
      productArray.sort(this.compareMin);   
    }
    if (this.state.sortPrice == 'max') {
      productArray.sort(this.compareMax);   
    }

    productsCode = productArray.map( product => 
      <Product key={product.id} info={product}  />
    )


    return (
      <div className='Products'>

        <Category cbGetBrand={this.getBrand} cbGetTypeProduct={this.getTypeProduct}
        cbSetMaxPrice={this.setMaxPrice} cbSetMinPrice={this.setMinPrice} />

        <div className='ProductsList'>
          <span>Поиск: </span><input className='Search' type="text" placeholder='введите данные' onChange={this.search} />
          <br />
          <span>Cортировка по цене: </span>
          <div className='PriceArrow' onClick = {this.sortMinPrice}> &#11014; </div>
          <div className='PriceArrow' onClick = {this.sortMaxPrice}> &#11015; </div>

          {productsCode}
        </div>

      </div>
    )
    ;

  }

}


const mapStateToProps = function (state) {
  return {
    products: state.products,
  };
};

export default connect(mapStateToProps)(Products);
