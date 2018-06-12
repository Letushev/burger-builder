import * as actionTypes from './actionTypes';
import axiosOrders from '../../axios-orders';

export const addIngredient = name => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name
  };
};

export const removeIngredient = name => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name
  };
};

export const setIngredients = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  };
};

export const failToFetchIngredients = error => {
  return {
    type: actionTypes.FAIL_TO_FETCH_INGREDIENTS,
    error: error
  };
};

export const fetchIngredients = () => {
  return dispatch => {
    axiosOrders.get('https://burger-builder-5c675.firebaseio.com/ingredients.json')
      .then(response => {
        dispatch(setIngredients(response.data));
      })
      .catch(error => {
        dispatch(failToFetchIngredients("Can't get ingredients"));
      })
  }
}
