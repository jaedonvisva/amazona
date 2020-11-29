/* eslint-disable no-underscore-dangle */
import expressAsyncHandler from 'express-async-handler';
import express from 'express';
import User from '../models/userModel.js';
import data from '../data.js';
import Product from '../models/productModel.js';

const userRouter = express.Router();

userRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    const users = await User.insertMany(data.users);
    const products = Product.insertMany(
      data.products.map((product) => ({ ...product, seller: users[0]._id }))
    );
    res.send({ users, products });
  })
);
export default userRouter;
