import React from 'react';
import data from '../data';
import Product from '../components/Product';
import Rating from '../components/Rating';

export default function ProductScreen(props) {
  const productId = props.match.params.id;
  const product = data.products.find((x) => x._id === productId);
  return (
    <div class="details">
      <div class="details-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div class="details-info">
        <ul>
          <li>
            <h1>{product.name}</h1>
          </li>
          <li>
            <Rating value={product.rating} text={product.numReviews} />
          </li>
          <li className="price">Price: ${product.price}</li>
          <li>
            Description:
            <div>{product.description}</div>
          </li>
        </ul>
      </div>
      <div class="details-action">
        <ul>
          <li>Price: ${product.price}</li>
          <li>
            Status:
            {product.countInStock > 0 ? (
              <span class="success">In Stock</span>
            ) : (
              <span class="error">Unavailable</span>
            )}
          </li>
          <li>
            <button id="add-button" class="primary fw">
              Add to Cart
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
