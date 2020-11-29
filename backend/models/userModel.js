import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
  isSeller: { type: Boolean, required: true, default: false },
  seller: {
    name: String,
    logo: String,
    description: String,
    rating: { type: Number, default: 0 },
    number: { type: Number, default: 0 },
  },
});

const User = mongoose.model('User', userSchema);
export default User;
