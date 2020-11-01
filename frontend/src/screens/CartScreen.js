import React from 'react';

export default function CartScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search ? props.location.search.split('=')[1] : 1;

  return (
    <div>
      <h1>Sopping Cart</h1>
      {productId && (
        <span>
          Adding Product {productId} For {qty} Time(s)
        </span>
      )}
    </div>
  );
}
