import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  images: [String],
  brand: { type: String, required: true },
  description: { type: String, required: true },
  countInStock: { type: Number, required: true, default: 0 },
  price: { type: Number, required: true, default: 0 },
  rating: { type: Number, required: true, default: 0 },
  numReviews: { type: Number, required: true, default: 0 },
  reviews: [{ name: String, comment: String, rating: Number }],
});
const Product = mongoose.model('Product', productSchema);
export default Product;
