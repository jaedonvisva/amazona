import React, { useState } from 'react';
import { Link, BrowserRouter, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import data from './data';
import useComponentVisible from './components/useComponentVisible';
import { useDispatch, useSelector } from 'react-redux';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import { signout } from './actions/userActions';

function App() {
  const { ref, isComponentVisible } = useComponentVisible(false);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(signout());
  };

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <button
              className="open-sidebar"
              type="button"
              onClick={() => setSidebarIsOpen(true)}
            >
              <i className="fa fa-bars"></i>
            </button>
            <Link className="brand" to="/">
              amazona
            </Link>
          </div>
          <div>
            <Link to="/cart">
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>

            {userInfo ? (
              <div className="dropdown">
                <Link to="#admin">
                  {userInfo.name} <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li>
                    <Link onClick={signoutHandler}>Sign out</Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
          </div>
        </header>

        <aside
          ref={ref}
          className={isComponentVisible || sidebarIsOpen ? 'open' : ''}
        >
          <ul>
            <li>
              <strong>Shopping Categories</strong>
              <button onClick={() => setSidebarIsOpen(false)}>
                <i className="fa fa-close"></i>
              </button>
            </li>
            {data.categories.map((category) => (
              <li className="category" key={category}>
                <Link
                  onClick={() => setSidebarIsOpen(false)}
                  to={`/search/category/${category}`}
                >
                  {category}
                  <span>
                    <i className="fa fa-arrow-right"></i>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
        <main>
          <Route path="/shipping" component={ShippingScreen}></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/product/:id" component={ProductScreen}></Route>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route
            path="/search/category/:category"
            component={HomeScreen}
          ></Route>
          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        <footer className="row center">
          <div>2020 All rights reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
