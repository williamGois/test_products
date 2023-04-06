import mongoose, { Schema, Document } from 'mongoose';

export interface CategoryModel extends Document {
  parent: CategoryModel | null;
  name: string;
}

const categorySchema = new mongoose.Schema({
  parent: { type: Schema.Types.ObjectId, ref: 'Category', default: null },
  name: {
    type: String,
    required: [true, "A category must have a name"],
    unique: true,
    trim: true,
    maxlength: [20, "A category name must have less or equal than 20 characters"],
    minlength: [3, "A category name must have more or equal than 3 characters"],
  },
}, { timestamps: true });

const Category = mongoose.model<CategoryModel>('Category', categorySchema);

export default Category;
