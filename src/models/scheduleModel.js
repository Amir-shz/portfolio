import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
  date: Date,
  hours: [
    {
      hour: {
        type: String,
        required: true,
      },
      isAvailable: {
        type: Boolean,
        default: true,
      },
      _id: false,
    },
  ],
});

scheduleSchema.virtual("available").get(function () {
  return this.hours.filter((hour) => hour.isAvailable).length;
});

scheduleSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret.id;
    return ret;
  },
});
scheduleSchema.set("toObject", { virtuals: true });

const Schedule =
  mongoose.models.Schedule || mongoose.model("Schedule", scheduleSchema);

export default Schedule;
