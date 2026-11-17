import mongoose, { type InferSchemaType, type Model } from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    url: { type: String, default: "" },
    alt: { type: String, default: "", maxlength: 200 },
    width: { type: Number, default: 0 },
    height: { type: Number, default: 0 },
  },
  { _id: false },
);

const headingSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    text: { type: String, required: true },
    level: { type: Number, required: true },
  },
  { _id: false },
);

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    slug: { type: String, required: true, trim: true, maxlength: 90 },
    excerpt: { type: String, default: "", trim: true, maxlength: 300 },
    coverImage: { type: imageSchema, default: () => ({}) },

    // Tiptap JSON: the source of truth for editing
    content: { type: mongoose.Schema.Types.Mixed, required: true },
    // Sanitized HTML rendered from `content` at save time (what visitors get)
    contentHtml: { type: String, default: "" },
    headings: { type: [headingSchema], default: [] },
    plainText: { type: String, default: "", select: false },
    readingTime: { type: Number, default: 1 },

    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", default: null },
    tags: { type: [String], default: [] },

    status: { type: String, enum: ["draft", "published"], default: "draft" },
    publishedAt: { type: Date, default: null },
    featured: { type: Boolean, default: false },

    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    authorName: { type: String, default: "" },

    seo: {
      title: { type: String, default: "", maxlength: 70 },
      description: { type: String, default: "", maxlength: 170 },
    },
  },
  { timestamps: true, minimize: false },
);

postSchema.index({ slug: 1 }, { unique: true });
postSchema.index({ status: 1, publishedAt: -1 });
postSchema.index({ category: 1 });
postSchema.index({ tags: 1 });

export type PostDoc = InferSchemaType<typeof postSchema>;

const Post: Model<PostDoc> =
  (mongoose.models.Post as Model<PostDoc>) || mongoose.model<PostDoc>("Post", postSchema);

export default Post;
