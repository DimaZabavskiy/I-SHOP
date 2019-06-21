import React from 'react';
import isoFetch from 'isomorphic-fetch';
import './pages/ProductInfo.css';
import {connect} from 'react-redux';
import { productsThunkAC } from "../redux/fetchThunk";

class ProductComment extends React.PureComponent {

  state = {
    dataChecket: true,
    setName: '',
    setText: '',
    setComment:false,
    loaded: false,
    data: [],
  }

    setName = EO => {
        this.setState({
            dataChecket: true,
            setName: EO.target.value,
        })
    }

    setText = EO => {
        this.setState({
            dataChecket: true,
            setText: EO.target.value,
        })
    }

    cancel = () => {
        this.props.cbCancel();
    }


    addCommentToAjax = () => {
        if (this.state.setName == 0 || this.state.setText == 0) {
            return this.setState ({
                dataChecket: false,
            })
        }

        let name = this.state.setName;
        let text = this.state.setText;
        let getDate = new Date ();
        let setDate = getDate.getDate() + '.' + (getDate.getMonth()+1) + '.' + getDate.getFullYear();

        let adress = "http://localhost:3000/protein/" + this.props.info.id;

        isoFetch(adress, {
            method: 'PATCH',
            headers: {
                "Content-type": "application/json",
            }, body: JSON.stringify({...this.props.info, comment: [...this.props.info.comment,
                {name: name, date: setDate, text: text}] })
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
                this.setState ({
                    setComment: false,
                    setName: '',
                    setText: '',
                });
                this.cancel();
                this.props.dispatch( productsThunkAC(this.props.dispatch) );
            })
            .catch( (error) => {
                console.log('mistake');
                console.error(error);
            });
    }
          
  render() {

    console.log('render ProductComment');
    return (
            <div className='productComment'>
                <input type='text' placeholder='Введите имя' onChange={this.setName} />
                <br />
                {!this.state.dataChecket && <span className='redSpan'>Заполнение поля обязательно</span> }
                <br />
                <textarea data='commentatorCampanyText' placeholder='Комментарий' onChange={this.setText} />
                <br />
                {!this.state.dataChecket && <span className='redSpan'>Заполнение поля обязательно</span> }
                <br />
                <button onClick={this.cancel}>Отмена</button>
                <button onClick={this.addCommentToAjax}>Добавить</button>
            </div>
    );
    
  }

}

const mapStateToProps = function (state) {
    return {
      products: state.products,
    };
  };
  
  export default connect(mapStateToProps)(ProductComment);