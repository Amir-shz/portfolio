import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
  },
  photo: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlenght: 8,
    select: false,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  role: {
    type: String,
    required: true,
    enum: {
      values: ["OWNER", "ADMIN"],
    },
    default: "ADMIN",
  },
});

const User = mongoose.models?.User || mongoose.model("User", userSchema);

export default User;
