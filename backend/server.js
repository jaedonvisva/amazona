import express from 'express';
import data from './data.js';

const app = express();
const PORT = 5000;
const SERVER = `http://localhost:${PORT}`;
app.get('/', (req, res) =>
  res.send({ status: 'Server is ready', apis: [`${SERVER}/api/products`] })
);

app.get('/api/products', (req, res) => {
  const products = req.query.category
    ? data.products.filter((product) => product.category === req.query.category)
    : data.products;
  res.send(products);
});
app.get('/api/products/:id', (req, res) => {
  const product = data.products.find((x) => x._id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).message({ message: 'Product Not Found' });
  }
});

app.listen(5000, () => {
  console.log(`Server is ready at ${SERVER}`);
});
