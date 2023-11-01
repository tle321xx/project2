import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UserSingleProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [price, setPrice] = useState("");

  const getSingleProduct = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${params.id}?api_key=d5ab7fc26b1d7286e6674614ce58ea5a`
      );
      setMovie(response.data);
      getSinglePrice(response.data.id);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const getSinglePrice = async (movieId) => {
    try {
      const { data } = await axios.get(
        `http://localhost:9999/api/v1/auth/price/${movieId}`
      );
      setPrice(data.price);
    } catch (error) {
      console.error("Error getSilglePrice: ", error);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, [params.id]);

  const handleSubmit = async (e) => {
    // Handle form submission logic here
  };

  return (
    <Layout>
      {movie ? (
        <form
          className="d-flex justify-content-center flex-wrap text-center border border-primary"
          style={{ width: "800px" }}
          onSubmit={handleSubmit}
        >
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            height={"350px"}
          />
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>Release Date: {movie.release_date} | </p>
          <p>| Original Language: {movie.original_language} | </p>
          <p>| Vote Average: {movie.vote_average} | </p>
          <p>| Vote Count: {movie.vote_count}</p>
          <div className="p-2 align-center">
            <h5 className="pt-3">
              {price ? `$${price}` : "Price not available"}
            </h5>
            <button className="btn btn-primary m-2" type="submit">
              Add To Cart!
            </button>
          </div>
        </form>
      ) : (
        <div className="d-flex justify-content-center align-items-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default UserSingleProduct;
