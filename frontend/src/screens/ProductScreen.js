import React from 'react';
import data from '../data';
import Product from '../components/Product';

export default function ProductScreen(props) {
  const productId = props.match.params.id;
  const product = data.products.find((x) => x._id === productId);
  return <div>{product.name}</div>;
}
