import React from 'react';
import './pages/Products.css'

class Category extends React.PureComponent {

    state = {
        minPrice: '',
    }


    getTypeProduct = (EO) => {
        this.props.cbGetTypeProduct(EO.target.value);
    }

    getBrand = (EO) => {
        this.props.cbGetBrand(EO.target.value);
    }

    setMinPrice = (EO) => {
        if (EO.target.value) {
            this.props.cbSetMinPrice(EO.target.value);
        }
    }

    setMaxPrice = (EO) => {
        this.props.cbSetMaxPrice(EO.target.value);
    }

    render () {
        console.log('render Category');

        return (
            <div className='Category'>

            <span>Вид продукта:</span>
            <br />
            <select name='type' onChange={this.getTypeProduct} >
                <option value='Все товары' >Все товары</option>
                <option value='Протеин' >Протеин</option>
                <option value='Гейнер' >Гейнер</option>
                <option value='Жиросжигатель' >Жиросжигатель</option>
                <option value='Батончики' >Батончики</option>
            </select>
            <br />      
            <br />
            
            <span>Цена:</span>
            <br />
            <input type='text' placeholder='Минимальная' onChange={this.setMinPrice} />
            <br />
            <input type='text' placeholder='Максимальная' onChange={this.setMaxPrice} />
            <br />
            <br />
            
            <span>Производитель:</span>
            <br />
            <label><input type='checkbox' name='developer' value='VPLab' onChange={this.getBrand} /> VPLab </label>
            <br />
            <label><input type='checkbox' name='developer' value='PureProtein'  onChange={this.getBrand}/> PureProtein </label>
            <br />
            <label><input type='checkbox' name='developer' value='Biotech USA'  onChange={this.getBrand}/> Biotech USA </label>
            <br />
            <label><input type='checkbox' name='developer' value='QNT'  onChange={this.getBrand}/> QNT </label>
            

            
            </div>
        )
    }
}

export default Category;