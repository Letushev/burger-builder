import * as actionTypes from '../actions/actionTypes';
import { updateObj } from '../../shared/helpers';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: null
};

const INGREDIENTS_PRICES = {
  meat: 1.3,
  salad: 0.5,
  cheese: 0.7,
  bacon: 1.0
};

const addIngredient = (state, action) => {
  return updateObj(state, {
    ingredients: updateObj(state.ingredients, {
      [action.ingredientName]: state.ingredients[action.ingredientName] + 1
    }),
    totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName]
  });
};

const removeIngredient = (state, action) => {
  return updateObj(state, {
    ingredients: updateObj(state.ingredients, {
      [action.ingredientName]: state.ingredients[action.ingredientName] - 1
    }),
    totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredientName]
  });
};

const setIngredients = (state, action) => {
  return updateObj(state, {
    ingredients: action.ingredients,
    totalPrice: initialState.totalPrice,
    error: null
  });
};

const failToFetchIngredients = (state, action) => {
  return updateObj(state, { error: action.error });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
    case actionTypes.FAIL_TO_FETCH_INGREDIENTS: return failToFetchIngredients(state, action);
    default: return state;
  }
};

export default reducer;