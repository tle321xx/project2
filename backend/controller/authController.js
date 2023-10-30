import { comparePassword, hashPassword } from "../helper/authHelper.js";
import userModel from "../model/userModel.js";
import JWT from "jsonwebtoken";
import axios from "axios";
import dotenv from "dotenv";
import movieModel from "../model/movieModel.js";

dotenv.config();

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    if (!name) {
      res.status(200).send({ success: false, message: "name is required" });
    }
    if (!email) {
      res.status(200).send({ success: false, message: "email is required" });
    }
    if (!password) {
      res.status(200).send({ success: false, message: "password is required" });
    }
    if (!phone) {
      return res.send({ message: "Phone is required" });
    }
    if (!address) {
      return res.send({ message: "Address is required" });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "This email has registerd",
      });
    }
    const hashedPassword = await hashPassword(password);
    const newUser = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();
    res.status(201).send({
      success: true,
      message: "Register Successfully",
      newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in register controller",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(403).send({
        success: false,
        message: "Email or Password is incorrect",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(403).send({
        success: false,
        message: "Email is not registered",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(403).send({
        success: false,
        message: "Incorrect Password",
      });
    }
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({
      success: true,
      message: "Login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login controller",
      error,
    });
  }
};

export const testController = (req, res) => {
  res.send("Test Controller");
};

export const priceController = async (req, res) => {
  try {
    const { id, price, title, overview } = req.body;
    console.log('Movie ID:', id, 'Price:', price, 'Title:', title , 'Overview:', overview);
    if (!id || isNaN(price) || price <= 0) {
        return res.status(400).send({ success: false, message: "Invalid movie ID or price" });
      }
      let movie = await movieModel.findOne({ tmdbId: id });
      console.log(movie)
      if (!movie) {
        movie = new movieModel({
          tmdbId: id,
          price: price,
          title: title,
          overview: overview
        });
      } else {
        // If the movie exists, update the price
        console.log(price)
        movie.price = price;
        movie.title = title,
        movie.overview = overview
      }
      await movie.save();
      res.status(200).send({ success: true, message: "Price added successfully", movie });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in price controller",
      error,
    });
  }
};

export const getPriceController = async(req,res) =>{
    try {
        const movieId = req.params.movieId;
        if (!movieId || isNaN(movieId)) {
            return res.status(400).send({ error: 'Invalid movie ID' });
          }
        const movie = await movieModel.findOne({ tmdbId: movieId });
        if (movie) {
          const price = movie.price;
          res.status(200).send({ price });
        } else {
          res.status(404).send({ error: 'Movie not found' });
        }
      } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Internal Server Error' });
      }
}

export const searchController = async(req,res) =>{
  try {
    const { keyword } = req.params;
    const result = await movieModel
      .find({
        $or: [
          { title: { $regex: keyword, $options: "i" } },
          { overview: { $regex: keyword, $options: "i" } },
        ],
      })
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in search controller",
      error,
    });
  }
}