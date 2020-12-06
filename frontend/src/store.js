import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import {
  productListreducer,
  productDetailsReducer,
} from './reducers/productReducers';
import {
  userRegisterReducer,
  userSigninReducer,
} from './reducers/userReducers';

const initialState = {
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
  },
};
const reducer = combineReducers({
  productList: productListreducer,
  cart: cartReducer,
  productDetails: productDetailsReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
