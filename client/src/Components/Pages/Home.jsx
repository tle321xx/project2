import React, { useState, useEffect, useMemo } from "react";
import Layout from "../Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";

const Home = () => {
  const [movies, setMovies] = useState([]);

  const getAllMovies = async () => {
    try {
      const { data } = await axios.get(
        "https://api.themoviedb.org/3/search/movie?api_key=d5ab7fc26b1d7286e6674614ce58ea5a&query=a"
      );
      setMovies(data.results);
    } catch (error) {
      console.log(error);
      toast.error("Error in getAllMovies");
    }
  };

  const getPrice = useMemo(() => async () => {
    try {
      const updatedMovies = await Promise.all(
        movies.map(async (movie) => {
          const response = await axios.get(`http://localhost:9999/api/v1/auth/price/${movie.id}`);
          const { price } = response.data;
          return { ...movie, price };
        })
      );
        setMovies(updatedMovies);
      
    } catch (error) {
      console.log(error);
      toast.error("Error in fetching movie prices");
    }
  }, []);
  
  useEffect(() => {
    getAllMovies();
  }, []); // Empty dependency array for initial data fetching

  useEffect(() => {
    getPrice();
  }, []); // Fetch movie prices whenever movies state changes

  return (
    <Layout>
      <h3 className="text-center">All Movies</h3>
      <div
        className="d-flex justify-content-center flex-wrap text-center"
        style={{ width: "2000px" }}
      >
        {movies.map((movie, index) => (
          <div className="card m-2 pb-5" style={{ width: "18rem" }} key={index}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              height={"350px"}
            />
            <h5 className="pt-3">{movie.title.substring(0, 30)}</h5>
            <h5 className="pt-3">
              {movie.price ? `$${movie.price}` : "Price not available"}
            </h5>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
