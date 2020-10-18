import React, { useState } from 'react';
import { Link, BrowserRouter, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import data from './data';
import useComponentVisible from './components/useComponentVisible';

function App() {
  const { ref, isComponentVisible } = useComponentVisible(false);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  console.log(isComponentVisible);
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
            <Link to="/cart">Cart</Link>
            <Link to="/signin">Sign In</Link>
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
