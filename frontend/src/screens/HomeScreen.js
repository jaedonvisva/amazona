import React, { useEffect } from 'react';
import Product from '../components/Product';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';

export default function HomeScreen(props) {
  const category = props.match.params.category;
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts(category));
  }, [category, dispatch]);

  return (
    <div className="row center">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          {products.length === 0 && <div>No Product Found!</div>}
          {products.map((product) => (
            <Product key={product._id} product={product}></Product>
          ))}
        </>
      )}
    </div>
  );
}
