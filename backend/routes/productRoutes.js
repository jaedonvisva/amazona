import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

const productRouter = express.Router();

productRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const categoryFilter = req.query.category
      ? { category: req.query.category }
      : {};
    const products = await Product.find({ ...categoryFilter }).populate(
      'seller'
    );

    res.send(products);
  })
);

productRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate('seller');
    res.send(product);
  })
);

export default productRouter;
