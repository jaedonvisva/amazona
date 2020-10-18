import React from 'react';
import data from '../data';
import Product from '../components/Product';

export default function HomeScreen(props) {
  const filteredProducts = props.match.params.category
    ? data.products.filter(
        (product) =>
          props.match.params.category
            .toLowerCase()
            .indexOf(product.category.toLowerCase()) >= 0
      )
    : data.products;

  return (
    <div className="row center">
      {filteredProducts.length === 0 && <div>No Product Found!</div>}
      {filteredProducts.map((product) => (
        <Product key={product._id} product={product}></Product>
      ))}
    </div>
  );
}
