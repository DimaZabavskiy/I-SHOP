import React from 'react';
import './Footer.css'



class Footer extends React.PureComponent {

          
  render() {
    console.log('render Footer');
    return (
      <div className='Footer'>
          <div className='Payment'><h5>Принимаем к оплате</h5>
            <img src='https://i.ibb.co/9gGVZBf/iconfinder-1-credit-2629958.png' />
            <img src='https://i.ibb.co/PDcKgBM/iconfinder-payment-method-master-card-206680.png' />
          </div>

          <div className='OurNetwork'><h5>Мы в соцсетях</h5>
            <a href='https://vk.com/id26029387' target='_blank'>
                <img src='https://i.ibb.co/Jz2FT48/iconfinder-11-939748.png' /></a>
            <a href='https://www.instagram.com/' target='_blank'>
                <img src='https://i.ibb.co/71L0z3P/iconfinder-25-social-2609558.png' /></a>
          </div>
          <div className='Contacts'><h5>Наши контакты</h5>
            <p>+375(29)773-92-37<br />
            DimaZabavskiy@yandex.ru</p>
            <p>223232, г. Минск, ул. Васнецова, 32</p>
          </div>
      </div>
    );
    
  }

}

export default Footer;