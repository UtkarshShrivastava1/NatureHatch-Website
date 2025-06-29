const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  user: { type: String, required: true },  // ✅ Only required when adding a review
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now },
});


const ProductSchema = new mongoose.Schema({
  productname: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  imageURL: {
     type: String,
    //   required: true
    },
  bestSeller: { type: Boolean, default: false,enum: [true, false] },
  onSale: { type: Boolean, default: false,enum: [true, false] },
  salePrice: { type: Number },
  category: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  reviews: [ReviewSchema],
  averageRating: { type: Number, default: 0 },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
