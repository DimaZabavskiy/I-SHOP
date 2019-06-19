import { ADD_TO_BASKET, COUNTER_BUTTON_ADD,
  DELETE_FROM_BASKET, CLEAR_BASKET, ADD_FROM_LOCALSTORAGE} from './basketAC';

const initState={

  //status: 0, // 0 - ничего не началось, 1 - идёт загрузка, 2 - была ошибка, 3 - данные загружены
  chosenProduct: [],

}

function basketReducer(state=initState,action) {
  switch (action.type) {

    case ADD_TO_BASKET: {
      let newState={...state};
      for (let i = 0; i < newState.chosenProduct.length; i++) {
        if (newState.chosenProduct[i].id == action.chosenProd.id) {
          newState.chosenProduct[i].count++;
          localStorage["chosenProduct"] = JSON.stringify(newState.chosenProduct);
          return newState;
        }
      } 

      let addProd = {...action.chosenProd};
      addProd.count = 1;
      newState.chosenProduct.push(addProd);
      localStorage["chosenProduct"] = JSON.stringify(newState.chosenProduct);
      return newState;
    }

    case COUNTER_BUTTON_ADD: {
      let newState={...state};
      for (let i = 0; i < newState.chosenProduct.length; i++) {
        if (newState.chosenProduct[i].id == action.chosenProdID) {
          newState.chosenProduct[i].count += action.addvalue;
          if (newState.chosenProduct[i].count < 1) {
            newState.chosenProduct[i].count = 1;
          }
          localStorage["chosenProduct"] = JSON.stringify(newState.chosenProduct);
          return newState;
        }
      }
    }

    case DELETE_FROM_BASKET: {
      let newState={...state};
      for (let i = 0; i < newState.chosenProduct.length; i++) {
        if (newState.chosenProduct[i].id == action.deleteProdId) {
          newState.chosenProduct.splice(i,1);
          localStorage["chosenProduct"] = JSON.stringify(newState.chosenProduct);
          return newState;
        }
      }
    }
    case CLEAR_BASKET: {
      let newState = {...state};
      newState.chosenProduct = [];
      localStorage["chosenProduct"] = JSON.stringify(newState.chosenProduct);
      return newState;
    }
    case ADD_FROM_LOCALSTORAGE: {
      console.log('сработал редьюсер добавления в корзину из локалсториджа');
      let newState = {...state};
      newState.chosenProduct = action.product;
      return newState;
    }

    
    default:
      return state;
  }
}

export default basketReducer;
