/* eslint-disable no-underscore-dangle */
import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 5000;
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost/mern-mp-jaedon';

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('DB Connected'))
  .catch((error) => console.error(error));

const SERVER = `http://localhost:${PORT}`;
 /* app.get('/', (req, res) =>
  res.send({ status: 'Server is ready', apis: [`${SERVER}/api/products`] })
); */
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/frontend/build/index.html`));
});
app.listen(PORT, () => {
  console.log(`Server is ready at ${SERVER}`);
});
