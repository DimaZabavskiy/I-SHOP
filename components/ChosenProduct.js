import React from 'react';
import {connect} from 'react-redux';
import {counterButton_add, delete_from_basket} from '../redux/basketAC';
import './pages/Page_Basket.css'

class ChosenProduct extends React.PureComponent {

    
    decCounter = () => {
        this.props.dispatch( counterButton_add(this.props.info.id,-1) );
    }

    incCounter = () => {
        this.props.dispatch( counterButton_add(this.props.info.id,1) );
    }
    deleteProduct= () => {
        this.props.dispatch( delete_from_basket (this.props.info.id) );
    }

    render () {
      console.log('render ChosenProduct');
        return (
            
            <tr key={this.props.info.id} className='ChosenProduct'>
              <td>{this.props.info.name}</td>
              <td>{this.props.info.cost}</td>
              <td>
                <div className='Math' onClick={this.decCounter} > - </div>
                <div className='Count'> {this.props.info.count} </div>
                <div className='Math'  onClick={this.incCounter} > + </div>
              </td>
              <td>
                <button onClick={this.deleteProduct}>Удалить</button>
              </td>
            </tr>
              
        )
    }

}


const mapStateToProps = function (state) {
    return {
      //products: state.products,
      basket: state.basket,
    };
  };
  
export default connect(mapStateToProps)(ChosenProduct);