const mongoose = require("mongoose")

const productModel = mongoose.Schema({
    name: {
      type: String,
    },
    price: {
      type: Number,
    },
    stock: {
      type: Number,
    },
    sku: {
      type: String,
      unique: true,
    },
    categoryId: {
        //category table _id -->
      type: mongoose.Schema.ObjectId,
      ref: "categories",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("products", productModel);