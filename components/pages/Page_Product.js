import React from 'react';
import {connect} from 'react-redux';
import { productsThunkAC } from "../../redux/fetchThunk";

import ProductInfo from './ProductInfo';

class Page_Product extends React.PureComponent {
    
  componentDidMount(){
    if (!this.props.products.data) {
      this.props.dispatch( productsThunkAC(this.props.dispatch) );
    }
  }


  render() {
    console.log('render Page_Product');
    
    if ( this.props.products.status<=1 )
      return "загрузка...";

    if ( this.props.products.status===2 )
      return "ошибка загрузки данных";
    
    // раз написано <Route path="/client/:clid" component={Page_Product} />
    // значит Page_Product получит то что в УРЛе после /product/ под именем props.match.params.clid в виде строки
    let productId=parseInt(this.props.match.params.clid);

    let productData=this.props.products.data.find( c => c.id==productId );

    return (
      <ProductInfo
        info={productData}
      />
      
    );
    
  }

}


const mapStateToProps = function (state) {
  return {
    products: state.products,
  };
};

export default connect(mapStateToProps)(Page_Product);
    
    