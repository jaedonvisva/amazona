/* eslint-disable no-underscore-dangle */
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import express from 'express';
import User from '../models/userModel.js';
import data from '../data.js';
import Product from '../models/productModel.js';
import { generateToken } from '../utils.js';

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
userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user),
      });
      // res.send({ message: 'Successfull Signin' });
    } else {
      res.status(401).send({ message: 'Invalid email or password' });
    }
  })
);

userRouter.post(
  '/register',
  expressAsyncHandler(async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    const createdUser = await user.save();
    res.send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      token: generateToken(createdUser),
    });
  })
);

export default userRouter;
