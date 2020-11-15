import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function CartScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;
  const cart = useSelector((state) => state.cart);
  const { loading, cartItems, error } = cart;
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [productId, qty, dispatch]);
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
    props.history.push('/cart');
  };
  const checkoutHandler = () => {
    props.history.push('/signin?redirect=shipping');
  };

  return (
    <div className="row top">
      <div className="col-2">
        <h1>Shopping Cart</h1>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        {cartItems.length === 0 ? (
          <MessageBox>
            Cart is empty. <Link to="/">Go Shopping</Link>
          </MessageBox>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.product}>
                <div className="row">
                  <div className="flex-1">
                    <img
                      src={item.image}
                      className="small"
                      alt={item.name}
                    ></img>
                  </div>
                  <div className="flex-3">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>
                  <div className="flex-1">{item.qty}</div>
                  <div className="flex-1">${item.price}</div>
                  <div className="flex-1">
                    <button
                      type="button"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="col-1">
        <div className="card card-body">
          <h2>
            Subtotal: ({cartItems.reduce((a, c) => a + c.qty, 0)} items) $
            {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
          </h2>
          <button
            onClick={checkoutHandler}
            disabled={cartItems.length === 0}
            className="primary block"
          >
            Proceed To Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
