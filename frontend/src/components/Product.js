import React from 'react';
import { Link } from 'react-router-dom';

export default function Product(props) {
  const { product } = props;
  return (
    <div className="card">
      <Link to={`/product/${product._id}`}>
        <img className="medium" src={product.image} alt={product.name}></img>
      </Link>
      <div className="card-body">
        <Link to={`/product/${product._id}`}>
          <h2>{product.name}</h2>
        </Link>
        <div class="product-brand">Brand: {product.brand}</div>
        <div class="product-price">Price: ${product.price}</div>
        <div class="product-rating">Rating: {product.rating}</div>
        <div class="product-reviews">
          Number of Reviews: {product.numReviews}
        </div>
      </div>
    </div>
  );
}
