import React from 'react';
import { Link, BrowserRouter } from 'react-router-dom';
import data from './data';
import Product from './components/Product';

function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">
              amazona
            </Link>
          </div>
          <div>
            <Link to="/cart">Cart</Link>
            <Link to="/signin">Sign In</Link>
          </div>
        </header>
        <main>
          <div className="row center">
            {data.products.map((product) => (
              <Product key={product._id} product={product}></Product>
            ))}
          </div>
        </main>
        <footer className="row center">
          <div>2020 All rights reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
