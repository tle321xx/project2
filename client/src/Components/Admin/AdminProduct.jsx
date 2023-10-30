import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";

const AdminProduct = () => {
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

  useEffect(() => {
    getAllMovies();
  }, []);

  // const handleSubmit = async () => {
  //   try {
  //     const res = await axios.post(
  //       "http://localhost:9999/api/v1/auth/price",
  //       {
  //         price,
  //       }
  //     );
  //     if (res) {
  //       setPrice(res.data);
  //       toast.success("Add price successfully");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Error in createPrice");
  //   }
  // };

  return (
    <Layout>
      <h3 className="text-center">Admin Edit Product</h3>
      <form
        className="d-flex justify-content-center flex-wrap text-center"
        style={{ width: "2000px" }}
        // onSubmit={handleSubmit}
      >
        {movies.map((movie, index) => (
          <Link
            key={movie._id}
            to={`/dashboard/admin/product/${movie.id}`} // Link to the product detail page with movie id
            className="product-link"
          >
            <div className="card m-2 pb-3" style={{ width: "18rem" }} key={index}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                height={"350px"}
              />
              <h5 className="pt-3">{movie.title.substring(0, 30)}</h5>
            </div>
          </Link>
        ))}
      </form>
    </Layout>
  );
};

export default AdminProduct;
