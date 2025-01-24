import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  plan: {
    type: String,
    required: true,
  },
});

const Plan = mongoose.models.Plan || mongoose.model("Plan", planSchema);
export default Plan;
