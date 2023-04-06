import mongoose, { Schema, Document } from "mongoose";
import { CategoryModel } from "./categoryModel";

export interface ProductModel extends Document {
  category: CategoryModel[];
  name: string;
  description: string;
  qty: number;
  price: number;
}

const ProductSchema: Schema = new Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  name: {
    type: String,
    required: [true, "The product must have a name"],
  },
  qty: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
}, { timestamps: true });

const Product = mongoose.model<ProductModel>("Product", ProductSchema);

export default Product;