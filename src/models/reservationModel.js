import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
  selectedDate: String,
  selectedTime: String,
  plan: String,
  fullName: String,
  phone: String,
  description: String,
});

const Reservation =
  mongoose.models.Reservation ||
  mongoose.model("Reservation", reservationSchema);

export default Reservation;
