import React from 'react';
import './pages/Page_Basket.css';

class Delivery extends React.PureComponent {
    
    state = {
        delivery: null,
        street: '',
        home: '',
        housing: '',
        room: '',
    }

    setStreet = EO => {
            this.setState ({
                street: EO.target.value,
            })
    }

    setHome = EO => {
            this.setState ({
                home: true,
            })
    }

    setHousing = EO => {
            this.setState ({
                housing: EO.target.value,
            })
    }

    setRoom = EO => {
            this.setState ({
                room: EO.target.value,
            })
    }
    ShowContact = () => {
        this.props.cbShowContact();
    }


    delivery = EO => {
        if (EO.target.value == 'courier') {
            this.setState({
                delivery: 'courier',
            })
        } else if (EO.target.value == 'self') {
            this.setState({
                delivery: 'self',
            })
        }
    }

    render () {
        console.log('render Delivery');

        return (
        
            <div className='Courier'>
                <b>Доставка:</b>
                
                <label onClick={this.delivery} ><input type='radio' name='delivery' value='courier' />Курьер</label>
                <label onClick={this.delivery} ><input type='radio' name='delivery' value='self' />Самовывоз</label>
        
                {
                    this.state.delivery == 'courier' &&
                    <div className='Delivery'>
                        Адрес доставки:
                        <br />
                        <input type='text' onChange={this.setStreet} placeholder='улица' />
                        {!this.state.street && <span className='redSpan'>Заполнение поля обязательно!</span> }
                        <br />
                        <input type='text' onChange={this.setHome} placeholder='дом' />
                        {!this.state.home && <span className='redSpan'>Заполнение поля обязательно!</span> }
                        <br />
                        <input type='text' onChange={this.setHousing} placeholder='корпус' />
                        {!this.state.housing && <span className='redSpan'>Заполнение поля обязательно!</span> }
                        <br />
                        <input type='text'  onChange={this.setRoom} placeholder='квартира' />
                        {!this.state.room && <span className='redSpan'>Заполнение поля обязательно!</span> }
                        
                        {(this.state.street && this.state.home && this.state.housing && this.state.room)
                            && <div className='ButtonNext'>
                            <button onClick={this.ShowContact}>Далее</button>
                        </div>}
                    </div>
                }
                {
                    this.state.delivery == 'self' &&
                    <div>
                        Забрать товар Вы можете с понедельника по пятницу с 09:00 до 18:00
                        по адресу: г. Минск, ул. Васнецова, д. 32
                        
                        <div className='ButtonNext'>
                            <button onClick={this.ShowContact}>Далее</button>
                        </div>
                    </div>
                }
            </div>

            
        )
    }

}

export default Delivery;