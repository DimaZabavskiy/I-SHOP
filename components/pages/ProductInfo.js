import React from 'react';
import PropTypes from 'prop-types';
import {addToBasketAC} from '../../redux/basketAC';
import {connect} from 'react-redux';
import ProductComment from '../ProductComment';
import './ProductInfo.css';

class ProductInfo extends React.PureComponent {

  /*static propTypes = {
    info:PropTypes.shape({
      fio: PropTypes.string.isRequired,
      balance: PropTypes.number.isRequired,
    }),
  };*/

  state = {
    setComment: false,
    mode: 'info', //если 'info', информация о продукте, если 'comment', комментарии о продукте
  }

  showInfo = () => {
    this.setState({
      mode: 'info',
    })
  }
  
  showComment = () => {
    this.setState({
      mode: 'comment',
    })
  }


  addToBasket = () => {
    this.props.dispatch(addToBasketAC(this.props.info));
  }

  addComment = () => {
    this.setState ({
        setComment: true,
    })
  }

  cancel = () => {
      this.setState ({
          setComment: false,
      })
  }

  render() {
    console.log('render ProductInfo');
    let comments = [];

    for (var i = 0; i<this.props.info.comment.length; i++) {
        comments.push(
            <div key={i}>
                <span><b>{this.props.info.comment[i].name}</b> ({this.props.info.comment[i].date}):</span>
                <p><i>{this.props.info.comment[i].text}</i></p>
            </div>
        )
    }


    return (
      <div className='ProductInfo_wrapper'>

        <div className="description">

          <div className='productImg'>
            <img src={this.props.info.image} />
          </div>
         
          <div className='productDesc'>
            <h1>&laquo;{this.props.info.name}&raquo;</h1>
            <hr />
            Категория: {this.props.info.type}
            <hr />
            Вес: {this.props.info.weight}
            <hr />
            Производитель: {this.props.info.brand}
            <hr />
            Цена: {this.props.info.cost}
            <hr />
            <button onClick={this.addToBasket}>В корзину</button>
          </div>

        </div>
          
        <hr />

        <div className='ProductInfo_comment'>
          <ul>
            <li onClick={this.showInfo} >Характеристика</li>
            <li onClick={this.showComment}>Комментарии о продукте</li>
          </ul>

          {this.state.mode == 'info' && <div>{this.props.info.description}</div>}

          {this.state.mode == 'comment' && 
          <div>
            {comments.length > 0 && <div className='Comments'>
              {comments}
            </div>}
            <button onClick={this.addComment}>Добавить комментарий</button>
            {this.state.setComment && <ProductComment cbCancel={this.cancel} info={this.props.info} />}
          </div>
          }

        </div>
        <hr />


      
      </div>
    )
    ;

  }

}


const mapStateToProps = function (state) {
  return {
    // весь раздел Redux state под именем counters будет доступен
    // данному компоненту как this.props.counters
    basket: state.basket,
  };
};

export default connect(mapStateToProps)(ProductInfo);
