import Axios from 'axios';
import {
  CART_ADD_ITEM_SUCCESS,
  CART_ADD_ITEM_FAIL,
  CART_ADD_ITEM_REQUEST,
  CART_REMOVE_ITEM,
} from '../constants/cartConstants';
export const addToCart = (productId, qty) => async (dispatch, getState) => {
  try {
    dispatch({ type: CART_ADD_ITEM_REQUEST, payload: { productId, qty } });
    const { data: product } = await Axios.get(`/api/products/${productId}`);
    if (product.countInStock === 0) {
      throw new Error(`${product.name} is out of stock`);
    }
    if (product.countInStock < qty) {
      throw new Error(`Not enough instance of ${product.name}`);
    }
    dispatch({
      type: CART_ADD_ITEM_SUCCESS,
      payload: {
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        qty,
      },
    });
    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    dispatch({ type: CART_ADD_ITEM_FAIL, payload: error.message });
  }
};

export const removeFromCart = (productId) => async (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};
