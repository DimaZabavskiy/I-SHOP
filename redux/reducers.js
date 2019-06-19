import { combineReducers } from 'redux';

import productsReducer from "./productsReducer";
import basketReducer from './basketReducer';
import userReducer from './userReducer';

let combinedReducer=combineReducers({
    products: productsReducer, // редьюсер countriesReducer отвечает за раздел state под именем countries
    // + другие редьюсеры
    basket: basketReducer,
    user: userReducer,
});

export default combinedReducer;
