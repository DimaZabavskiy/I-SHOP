const ADD_TO_USER='ADD_TO_USER';
const EXIT_FROM_USER='EXIT_FROM_USER';
const ADD_PRODUCTS_FROM_BASKET = 'ADD_PRODUCTS_FROM_BASKET';
const ADD_USER_FROM_LOCALSTORAGE = 'ADD_USER_FROM_LOCALSTORAGE';

const add_user_from_localstorage = function (user) {
  return {
    type: ADD_USER_FROM_LOCALSTORAGE,
    user: user,
  }
}

const addToUserAC=function(prod) {
  return {
    type: ADD_TO_USER,
    userProd: prod,
  };
}
const exitFromUserAC=function() {
    return {
      type: EXIT_FROM_USER,
      userProd: {},
    };
  } 
const add_products_from_basketAC = function (date, prod) {
  return {
    type: ADD_PRODUCTS_FROM_BASKET,
    date: date,
    addedProduct: prod,
  }
}

export {
    addToUserAC,ADD_TO_USER,
    exitFromUserAC,EXIT_FROM_USER,
    add_products_from_basketAC, ADD_PRODUCTS_FROM_BASKET,
    add_user_from_localstorage, ADD_USER_FROM_LOCALSTORAGE
}
