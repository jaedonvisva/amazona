import React, { useState, useEffect } from 'react';
import data from '../data';
import Product from '../components/Product';
import Axios from 'axios';

export default function HomeScreen(props) {
  const category = props.match.params.category;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await Axios.get('/api/products');
        setLoading(false);
        setProducts(
          category
            ? data.filter(
                (x) =>
                  category.toLowerCase().indexOf(x.category.toLowerCase()) >= 0
              )
            : data
        );
      } catch (err) {
        setLoading(false);
        setError(err.message);
      }
    };
    fetchProducts();
  }, [category]);

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
