import {EXIT_FROM_USER, ADD_PRODUCTS_FROM_BASKET,
  ADD_TO_USER, ADD_USER_FROM_LOCALSTORAGE} from './userAC';

const initState={

  status: false,// false, если регистрации не было, true, если регистрация была
  user: {},

}

function userReducer(state=initState,action) {
  switch (action.type) {    

    case ADD_USER_FROM_LOCALSTORAGE: {
      let newState={...state};
      newState.user = action.user;
      newState.status = true;
      return newState;
    }

    case ADD_TO_USER: {
        let newState={...state};
        newState.status = true;
        newState.user = action.userProd;
        localStorage["user"] = JSON.stringify(newState.user);
        return newState;
    }
    case EXIT_FROM_USER: {
        console.log('выход из редьюсера пользователя');
        let newState={...state};
        newState.status = false;
        newState.user = action.userProd;
        localStorage["user"] = JSON.stringify(newState.user);
        return newState;
    }

    case ADD_PRODUCTS_FROM_BASKET: {
      let newState = {...state};
      newState.user.myProducts.push({date: action.date, products: action.addedProduct });
      localStorage["user"] = JSON.stringify(newState.user);
      return newState;
    }
    default: {
      return state;
    }
  }
}
export default userReducer;
