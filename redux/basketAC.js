const ADD_TO_BASKET='ADD_TO_BASKET';
const COUNTER_BUTTON_ADD='COUNTER_BUTTON_ADD';
const DELETE_FROM_BASKET='DELETE_FROM_BASKET';
const CLEAR_BASKET = 'CLEAR_BASKET';
const ADD_FROM_LOCALSTORAGE = 'ADD_FROM_LOCALSTORAGE';

const addToBasketAC=function(prod) {
  return {
    type: ADD_TO_BASKET,
    chosenProd: prod,
  };
}
const counterButton_add=function(id,addvalue) {
  return {
    type: COUNTER_BUTTON_ADD,
    chosenProdID:id,
    addvalue:addvalue,
  };
}
const delete_from_basket = function(id) {
  return {
    type: DELETE_FROM_BASKET,
    deleteProdId: id,
  }
}
const clear_basket = function() {
  return{
    type: CLEAR_BASKET,
  }
}

const add_from_logalstorage = function (prod) {
  return {
    type: ADD_FROM_LOCALSTORAGE,
    product: prod,
  }
}



export {
    addToBasketAC,ADD_TO_BASKET,
    counterButton_add,COUNTER_BUTTON_ADD,
    delete_from_basket,DELETE_FROM_BASKET,
    clear_basket, CLEAR_BASKET,
    add_from_logalstorage, ADD_FROM_LOCALSTORAGE
}
