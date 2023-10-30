import mongoose from "mongoose";

const movieModel = new mongoose.Schema({
    tmdbId: {
        type: Number,
        required: true,
        unique: true,
      },
      price: {
        type: Number,
        required: true,
      },
      title :{
        type:String,
      },
      overview :{
        type:String,
      }
})

export default mongoose.model('price', movieModel)

