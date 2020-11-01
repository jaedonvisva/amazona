import express from 'express';
import data from './data.js';

const app = express();
const PORT = 5000;
const SERVER = `http://localhost:${PORT}`;
app.get('/', (req, res) =>
  res.send({ status: 'Server is ready', apis: [`${SERVER}/api/products`] })
);
app.get('/api/products', (req, res) => res.send(data.products));
app.listen(5000, () => {
  console.log(`Server is ready at ${SERVER}`);
});
