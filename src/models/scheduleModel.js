import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
  date: Date,
  hours: [
    {
      hour: String,
      isAvailable: {
        type: Boolean,
        default: true,
      },
      _id: false,
    },
  ],
});

scheduleSchema.virtual("available").get(function () {
  // شمارش تعداد آبجکت‌هایی که isAvailable برابر true هستند
  return this.hours.filter((hour) => hour.isAvailable).length;
});

// فعال کردن virtuals در خروجی JSON و Object
scheduleSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret.id; // حذف فیلد id از خروجی
    return ret;
  },
});
scheduleSchema.set("toObject", { virtuals: true });

const Schedule =
  mongoose.models.Schedule || mongoose.model("Schedule", scheduleSchema);

export default Schedule;
