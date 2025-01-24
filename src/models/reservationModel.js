import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
  selectedDate: { type: String, required: true },
  selectedTime: { type: String, required: true },
  plan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plan",
    required: true,
  },
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  description: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    required: true,
    enum: {
      values: ["new", "finish"],
    },
    default: "new",
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

const Reservation =
  mongoose.models.Reservation ||
  mongoose.model("Reservation", reservationSchema);

export default Reservation;
