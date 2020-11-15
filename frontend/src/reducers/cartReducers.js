import {
  CART_ADD_ITEM_FAIL,
  CART_ADD_ITEM_REQUEST,
  CART_ADD_ITEM_SUCCESS,
  CART_REMOVE_ITEM,
} from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM_REQUEST:
      return { ...state, loading: true };
    case CART_ADD_ITEM_SUCCESS:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        return {
          loading: false,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return { loading: false, cartItems: [...state.cartItems, item] };
      }

    case CART_ADD_ITEM_FAIL:
      return { ...state, loading: false, error: action.payload };
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    default:
      return state;
  }
};
