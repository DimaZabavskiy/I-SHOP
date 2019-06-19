import React from 'react';
import isoFetch from 'isomorphic-fetch';
import {addToUserAC} from '../redux/userAC';
import {connect} from 'react-redux';
import './PersonalCabinet.css';

class Registration extends React.Component {
          
    state = {
        checkedLength: true, // проверка длины введнных данных
        status: 'entrance', //'entrance' - вход в кабинет, 'newClient' - регистрация нового,
        //'password' - восстановление пароля, 'newPassword' - регистрация нового пароля
        enterName: '',
        enterFullName: '',
        enterPassword: '',
        checkedPassword: true,
        usedLogin: false,
        searchUser: true,
        checkData: true,
        restart: false, // если зарегистрировался, надо перестартануть
        clientID: null, //id клиента, у которого меняется пароль
        clientNewPassword: null, // клиент, которому будут менять пароль
    }

    enterName = (EO) => {
        this.setState({
            checkedLength: true,
            enterName: EO.target.value,
            usedLogin: false,
            searchUser: true,
            checkData: true,
        })
    }
    enterFullName = (EO) => {
        this.setState({
            enterFullName: EO.target.value,
        })
    }
    enterPassword = (EO) => {
        this.setState({
            checkedLength: true,
            enterPassword: EO.target.value,
            checkData: true,
        })
    }
    checkedPassword = (EO) => {
        if (EO.target.value != this.state.enterPassword) {
            this.setState ({
                checkedPassword: false,
            })
        } else {
            this.setState ({
                checkedPassword: true,
            })
        }
    }

    set_status_newCliens = () => {
        this.setState ({
            checkedLength: true,
            status: 'newClient',
            checkData: true,
        })
    }
    
    set_status_entrance = () => {
        this.setState ({
            checkedLength: true,
            status: 'entrance',
            checkData: true,
        })
    }

    set_status_password = () => {
        this.setState ({
            checkedLength: true,
            status: 'password',
            checkData: true,
        })
    }

    addNewPassword = () => {

        if (this.state.enterPassword == 0) {
            return this.setState({
                checkedLength: false,
            })
        }
        let newPassword = this.state.enterPassword;
        
        let adress = "http://localhost:3000/users/" + this.state.clientID;

        isoFetch(adress, {
            method: 'PATCH',
            headers: {
                "Content-type": "application/json",
            }, body: JSON.stringify({...this.state.clientNewPassword, password: {actual: newPassword,
                used: [...this.state.clientNewPassword.password.used, this.state.clientNewPassword.password.actual]}})
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
            .then( () => {
                this.set_status_entrance();
                this.setState({
                    restart: true,
                })

            })
            .catch( (error) => {
                console.log('mistake');
                console.error(error);
            })
        ; 

    }

    entrance = () => { // вход в систему
        if (this.state.enterName == 0 || this.state.enterPassword == 0) {
            return this.setState({
                checkedLength: false,
            })
        }
        let name = this.state.enterName;
        let password = this.state.enterPassword;

        isoFetch("http://localhost:3000/users", {
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
                for (let i = 0; i < data.length; i++) {
                    if (name == data[i].userName && password == data[i].password.actual) {
                            this.props.dispatch( addToUserAC(data[i]) );
                    } else {
                        this.setState ({
                            checkData: false,
                        })
                    }
                }
            })
            .catch( (error) => {
                console.log('mistake');
                console.error(error);
            })
            ;
      }

    checkedName = (EO) => { // проверка логина при внесении нового клиента и при восстановлении пароля
        let name = EO.target.value;
        isoFetch("http://localhost:3000/users", {
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
                if (this.state.status == 'newClient') {
                    for (let i = 0; i < data.length; i++) {
                        if (name == data[i].userName) {
                            this.setState({
                                usedLogin: true,
                            });
                            return;
                        }
                    }                 
                } else {
                    let checkedNum = 0;
                    for (let i = 0; i < data.length; i++) {
                        if (name != data[i].userName) {
                            if (i == checkedNum) {
                                this.setState({
                                    searchUser: false,
                                });
                            }
                            checkedNum++;
                        } else {
                            return;
                        }
                    }
                }
            })
            .catch( (error) => {
                console.log('mistake');
                console.error(error);
            })
            ;
    }

    addNewUser = () => { // добавить нового пользователя

        if (this.state.enterName == 0 || this.state.enterFullName == 0 || this.state.enterPassword == 0) {
            return this.setState({
                checkedLength: false,
            })
        }

        if (this.state.checkedPassword) {
            let name = this.state.enterName;
            let password = this.state.enterPassword;
            let fullName = this.state.enterFullName;
            isoFetch("http://localhost:3000/users", {
                method: 'POST',
                headers: {
                    "Content-type": "application/json",
                }, body: JSON.stringify({
                    userName:name,
                    password: {
                    actual:password,
                    used:[]
                    },
                    name:fullName,
                    myProducts: [
                        {
                        date:'',
                        products:[]
                        }
                    ]
                })
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
                    this.set_status_entrance();
                    this.setState({
                        restart: true,
                    })

                })
                .catch( (error) => {
                    console.log('mistake');
                    console.error(error);
                })
            ;
        }
    }

    passwordRestore = () => { // восстановление пароля
        if (this.state.enterName == 0 || this.state.enterPassword == 0) {
            return this.setState({
                checkedLength: false,
            })
        }

        let name = this.state.enterName;
        let password = this.state.enterPassword;
        isoFetch("http://localhost:3000/users", {
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
                for (let i = 0; i < data.length; i++) {
                    if (name == data[i].userName) {
                        for (let pass = 0; pass <= data[i].password.used.length; pass++) {
                            if (password == data[i].password.actual || password == data[i].password.used[pass]) {
                                this.setState ({
                                    status: 'newPassword',
                                    enterPassword: '',
                                    clientID: data[i].id,
                                    clientNewPassword: data[i],
                                })
                            } else {
                                this.setState ({
                                    checkData: false,
                                })
                            }
                        }
                    }  else {
                        this.setState ({
                            checkData: false,
                        })
                    }
                }
            })
            .catch( (error) => {
                console.log('mistake');
                console.error(error);
            })
            ;
    }

    render() {
        console.log('render Registration');
  
      return (
          <div className='Registration'>
              {this.state.status == 'entrance' &&
              <div>
                {this.state.restart && <span className='redSpan'>Данные успешно сохранены. Пройдите идентификацию:<br /></span> }
                <span>Логин: </span><input type='text' onChange={this.enterName} /><br />
                {!this.state.checkedLength && <span className='redSpan'>Поле обязательно для заполнения<br /></span> }
                <span>Пароль: </span><input type='password' onChange={this.enterPassword} /><br />
                {!this.state.checkedLength && <span className='redSpan'>Поле обязательно для заполнения<br /></span> }
                {(!this.state.checkData) && <span className='redSpan'>Введенные данные не найдены<br /></span>}
                <span className='Alternative' onClick={this.set_status_password}>Забыли пароль?</span><br />
                <span className='Alternative' onClick={this.set_status_newCliens}>Регистрация</span>
                <button onClick={this.entrance}>Войти</button>
             </div>
            }
            
            {this.state.status == 'newClient' &&
              <div>
                <span>Имя пользователя: </span><input type='text' onBlur={this.checkedName}  onChange={this.enterName} /><br />
                {this.state.usedLogin && <span className='redSpan'>Данное имя пользователя уже занято<br /></span>}
                {!this.state.checkedLength && <span className='redSpan'>Поле обязательно для заполнения<br /></span> }
                <span>ФИО: </span><input type='text' onChange={this.enterFullName} /><br />
                {!this.state.checkedLength && <span className='redSpan'>Поле обязательно для заполнения<br /></span> }
                <span>Пароль: </span><input type='password' onChange={this.enterPassword} /><br />
                {!this.state.checkedLength && <span className='redSpan'>Поле обязательно для заполнения<br /></span> }
                <span>Повторите пароль: </span><input type='password' onBlur={this.checkedPassword} /><br />
                {(!this.state.checkedPassword) && <span className='redSpan'>Введенные пароли не совпадают<br /></span>}
                {!this.state.checkedLength && <span className='redSpan'>Поле обязательно для заполнения<br /></span> }
                <button onClick={this.addNewUser}>Зарегистрироваться</button>
                <span className='Alternative' onClick={this.set_status_entrance}>Ранее регистрировались</span>
             </div>
            }

            {this.state.status == 'newPassword' && 
                <div>
                    <span>Регистрация нового пароля</span><br />
                    <span>Пароль: </span><input type='password' onChange={this.enterPassword} /><br />
                {!this.state.checkedLength && <span className='redSpan'>Поле обязательно для заполнения<br /></span> }
                    <span>Повторите пароль: </span><input type='text' onBlur={this.checkedPassword} /><br />
                {!this.state.checkedLength && <span className='redSpan'>Поле обязательно для заполнения<br /></span> }
                    {(!this.state.checkedPassword) && <span className='redSpan'>Введенные пароли не совпадают<br /></span>}
                    <button onClick={this.addNewPassword}>Запомнить</button>
                </div>
            }
            
            {this.state.status == 'password' &&
              <div>
                <span>Логин: </span><input type='text' onChange={this.enterName} onBlur={this.checkedName} /><br />
                {(!this.state.searchUser) && <span className='redSpan'>Пользователь с таким именем не найден<br /></span>}
                {!this.state.checkedLength && <span className='redSpan'>Поле обязательно для заполнения<br /></span> }
                
                <span>Любой пароль, когда-либо использованный в системе: </span>
                <input type='password' onChange={this.enterPassword}  /><br />
                {!this.state.checkedLength && <span className='redSpan'>Поле обязательно для заполнения<br /></span> }
                {(!this.state.checkData) && <span className='redSpan'>Введенные данные не найдены<br /></span>}
                <button onClick={this.passwordRestore}>Восстановить</button>
                <span className='Alternative' onClick={this.set_status_newCliens}>Регистрация</span>
             </div>
            }
          </div>
      );
      
    }
  
  }

  
const mapStateToProps = function (state) {
    return {
      user: state.user,
    };
  };
  
  export default connect(mapStateToProps)(Registration);