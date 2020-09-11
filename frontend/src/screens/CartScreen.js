import React from 'react';

export default function CartScreen(props) {
  const productId = props.match.params.id;
  return (
    <div>
      <h1>Sopping Cart</h1>
      {productId && <span>Adding Product {productId}</span>}
    </div>
  );
}
