import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
    adult: Boolean,
      backdrop_path: String,
      genre_ids: [Number],
      id: Number,
      original_language: String,
      original_title: String,
      overview: String,
      popularity: Number,
      poster_path: String,
      release_date: String,
      title: String,
      video: Boolean,
      vote_average: Number,
      vote_count: Number,
      price: Number
      },
    ],
    payment: {},
    buyer: {
      type: mongoose.ObjectId,
      ref: "user",
    },
    status: {
      type: String,
      default: "Not Process",
      enum: ["Not Process", "Processing", "Shipped", "deliverd", "cancel"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);