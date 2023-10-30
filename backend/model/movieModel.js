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
      },
      original_language :{
        type:String,
      },
      popularity :{
        type:String,
      },
      release_date :{
        type:String,
      },
      vote_average :{
        type:String,
      },
      vote_count :{
        type:String,
      },
      poster_path: {
        type:String,
      }

})

export default mongoose.model('price', movieModel)

