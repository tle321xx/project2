import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getAllMovies = async () => {
      try {
        const { data } = await axios.get(
          "https://api.themoviedb.org/3/search/movie?api_key=d5ab7fc26b1d7286e6674614ce58ea5a&query=a"
        );

        const moviesWithPrices = await Promise.all(
          data.results.map(async (movie) => {
            try {
              const response = await axios.get(
                `http://localhost:9999/api/v1/auth/price/${movie.id}`
              );
              return { ...movie, price: response.data.price };
            } catch (error) {
              console.error("Error fetching movie price: ", error);
              return { ...movie, price: null };
            }
          })
        );

        setMovies(moviesWithPrices);
      } catch (error) {
        console.error("Error fetching movies: ", error);
        toast.error("Error in getAllMovies");
      }
    };

    getAllMovies();
  }, []);

  return (
    <Layout>
      <h3 className="text-center">All Movies</h3>
      <form
        className="d-flex justify-content-center flex-wrap text-center"
        style={{ width: "2000px" }}
      >
        {movies.map((movie, index) => (
          <div className="card m-2 pb-4" style={{ width: "18rem" }} key={index}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              height={"350px"}
            />
            <h5 className="pt-3">{movie.title.substring(0, 30)}</h5>
            <p>{movie.overview.substring(0, 100)}...</p>
            <p> Vote Average: {movie.vote_average.toFixed(2)}  </p>
            <p> Vote Count: {movie.vote_count}</p>
            <h5 className="pt-3">
              {movie.price ? `$${movie.price}` : "Price not available"}
            </h5>
            <button className="btn btn-primary m-2" type="submit">Add To Cart!</button>
          </div>
        ))}
      </form>
    </Layout>
  );
};

export default Home;
