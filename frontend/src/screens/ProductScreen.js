import React, { useState } from 'react';
import data from '../data';
import Rating from '../components/Rating';

export default function ProductScreen(props) {
  const [selectedImage, setSelectedImage] = useState('');
  const [qty, setQty] = useState(1);
  const productId = props.match.params.id;
  const product = data.products.find((x) => x._id === productId);
  const switchImage = (image) => {
    setSelectedImage(image);
  };
  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };
  return (
    <div className="row top">
      <div className="col-2">
        <img
          className="large"
          src={selectedImage || product.image}
          alt={product.name}
        />
      </div>
      <div className="col-1">
        <ul>
          <li>
            <h1>{product.name}</h1>
          </li>
          <li>
            <Rating value={product.rating} text={product.numReviews} />
          </li>
          <li>Price: ${product.price}</li>
          <li>
            Images:
            <ul className="images">
              {[product.image, ...product.images].map((x) => (
                <li key={x}>
                  <button
                    type="button"
                    className="light"
                    onClick={() => switchImage(x)}
                  >
                    <img src={x} alt="product" className="small"></img>
                  </button>
                </li>
              ))}
            </ul>
          </li>
          <li>
            Description:
            <div>{product.description}</div>
          </li>
        </ul>
      </div>
      <div className="col-1">
        <div className="card card-body">
          <ul>
            <li>
              <div className="row">
                <div>Price</div>
                <div className="price">${product.price}</div>
              </div>
            </li>
            <li>
              <div className="row">
                <div>Status</div>
                <div>
                  {product.countInStock > 0 ? (
                    <span className="success">In Stock</span>
                  ) : (
                    <span className="error">Unavailable</span>
                  )}
                </div>
              </div>
            </li>
            {product.countInStock > 0 && (
              <>
                <li>
                  <div className="row">
                    <div>Qty</div>
                    <div>
                      <select
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </li>
                <li>
                  <button onClick={addToCartHandler} className="primary block">
                    Add to Cart
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
