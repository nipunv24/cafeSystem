import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    categoryName: { type: String, required: true, unique: true }, // Category name
    items: [
      {
        name: { type: String, required: true },  // Product name
        price: { type: Number, required: true }  // Product price
      }
    ]
  },
  { versionKey: false } // 👈 Disables "__v"
);

const Product = mongoose.model("Product", ProductSchema, "Products");
export default Product;
