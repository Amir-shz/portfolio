import mongoose, { type InferSchemaType, type Model } from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 60 },
    slug: { type: String, required: true, trim: true, maxlength: 80 },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

categorySchema.index({ name: 1 }, { unique: true });
categorySchema.index({ slug: 1 }, { unique: true });

export type CategoryDoc = InferSchemaType<typeof categorySchema>;

const Category: Model<CategoryDoc> =
  (mongoose.models.Category as Model<CategoryDoc>) ||
  mongoose.model<CategoryDoc>("Category", categorySchema);

export default Category;
