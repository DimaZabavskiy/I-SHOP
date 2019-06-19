import React from 'react';
import './pages/Page_Basket.css'

class Contacts extends React.PureComponent {
    
    state = {
        name: '',
        email: '',
    }
    
    saveName = () => {
        this.props.cbSaveName();
    }
    setName = EO => {
            this.setState ({
                name: EO.target.value,
            })
    }
    setEmail = EO => {
            this.setState ({
                email: EO.target.value,
            })
    }

    render () {
        console.log('render Contacts');

        return (
            <div className='Contacts'>
                <span>Контактная информация:</span>    
                <br />
                <input type='text' onChange={this.setName} placeholder='ФИО' />
                        {!this.state.name && <span className='redSpan'>Заполнение поля обязательно!</span> }
                <br />
                <input type='email' onChange={this.setEmail} placeholder='email' />
                        {!this.state.email && <span className='redSpan'>Заполнение поля обязательно!</span> }
                <br />
                <textarea type='text' placeholder='Дополнительная информация' />
                <br />
                { (this.state.name && this.state.email) && <button onClick={this.saveName}>Оформить заказ</button>}
            </div>
        )
    }

}

export default Contacts;