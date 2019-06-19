import isoFetch from 'isomorphic-fetch';

import { productsLoadingAC, productsErrorAC, productsSetAC } from "./productsAC";

function productsThunkAC(dispatch) {
    // Как и любой action creator, countriesThunkAC должен вернуть action,
    // только action будет не хэш, а ФУНКЦИЯ.
    // Все middleware стоят ДО редьюсеров, их задача - преобразовывать или фильтровать action-ы.
    // Конкретно middleware "thunk", если обнаруживает что action - функция а не хэш, 
    // ВЫПОЛНЯЕТ эту функцию и не пропускает её дальше, к редьюсерам.
    return function() {
        dispatch( productsLoadingAC() );
        isoFetch("http://localhost:3000/protein", {
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
                console.log('done');
                dispatch( productsSetAC(data) );
            })
            .catch( (error) => {
                console.log('mistake');
                console.error(error);
                dispatch( productsErrorAC() );
            })
        ;
    }

}

export {productsThunkAC};
