import React from 'react';
import isoFetch from 'isomorphic-fetch';
import './CompanyComment.css';

class CompanyComment extends React.PureComponent {

  state = {
    textLength: true, // проверка длины введенных имени и комментария
    setName: '',
    setText: '',
    setComment:false,
    loaded: false,
    data: [],
  }

  callIsoFetch = () => {
    isoFetch("http://localhost:3000/comment", {
        method: 'GET',
        headers: {
            "Accept": "application/json",
        },
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
            this.setState({
                loaded: true,
                data: data,
            })
        })
        .catch( (error) => {
            console.log('mistake');
            console.error(error);
        });
  }

  componentDidMount () {
    if(!this.state.loaded) {
        this.callIsoFetch();
    }
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
    
    setName = EO => {
        this.setState({
            textLength: true,
            setName: EO.target.value,
        })
    }

    setText = EO => {
        this.setState({
            textLength: true,
            setText: EO.target.value,
        })
    }


    addCommentToAjax = () => {
        if (this.state.setName == 0 || this.state.setComment == 0) {
            return this.setState ({
                textLength: false,
            })
        }

        let name = this.state.setName;
        let text = this.state.setText;
        let getDate = new Date ();
        let setDate = getDate.getDate() + '.' + (getDate.getMonth()+1) + '.' + getDate.getFullYear();

        isoFetch("http://localhost:3000/comment", {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
            }, body: JSON.stringify({name: name, date: setDate, text: text})
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
                });    
            this.callIsoFetch();
            })
            .catch( (error) => {
                console.log('mistake');
                console.error(error);
            });
    }
          
  render() {
    console.log('render CompanyComment: ');
    if (!this.state.loaded) {
        return 'Загрузка...'
    }

    let comments = [];

    for (var i = this.state.data.length -1; i >= 0; i--) {
        comments.push(
            <div key={i}>
                <span><b>{this.state.data[i].name}</b> ({this.state.data[i].date}):</span>
                <p><i>{this.state.data[i].text}</i></p>
                <hr />
            </div>
        )
    }

    return (

      <div className='CompanyComment'>
        <p className='TextComment'>Комментарии о компании</p>
        <div className='Comments'>{comments}</div>
        <button onClick={this.addComment} className='Button'>Добавить комментарий</button>
        {this.state.setComment && 
            <div>
                <br />
                <input type='text' placeholder='Введите имя' onChange={this.setName} />
                <br />
                {!this.state.textLength && <span className='redSpan'>Заполнение поля обязательно!</span> }
                <br />
                <textarea placeholder='Комментарий'onChange={this.setText} />
                <br />
                {!this.state.textLength && <span className='redSpan'>Заполнение поля обязательно!</span> }
                <br />
                <div className='Cancel' onClick={this.cancel}>Отмена</div>
                <button className='Button' onClick={this.addCommentToAjax}>Добавить</button>
            </div>
        }
      </div>
    );
    
  }

}
    
export default CompanyComment;