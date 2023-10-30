import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Style/AdminUpdateProduct.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AdminUpdateProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [price, setPrice] = useState("");

  useEffect(() => {
    const getSingleProduct = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${params.id}?api_key=d5ab7fc26b1d7286e6674614ce58ea5a`
        );
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    getSingleProduct();
  }, [params.id]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      // formData.append("id", params.id);
      // formData.append("price", parseFloat(price));
      // formData.append("title", movie.title);
      // formData.append("overview", movie.overview);
      // formData.append("original_language", movie.original_language);
      // formData.append("popularity", movie.popularity);
      // formData.append("release_date", movie.release_date);
      // formData.append("vote_averag", movie.vote_averag);
      // formData.append("vote_count", movie.vote_count);
      formData.append("poster_path", movie.poster_path);
      console.log(formData)
      const res = await axios.post("http://localhost:9999/api/v1/auth/price", {
        id: params.id,
        price: parseFloat(price),
        title: movie.title,
        poster_path: movie.poster_path,
        overview: movie.overview,
        original_language: movie.original_language,
        popularity: movie.popularity,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
        vote_count: movie.vote_count,
        poster_path: movie.poster_path
      });
      if (res) {
        toast.success("Add price successfully");
        navigate("/dashboard/admin/product");
      }
    } catch (error) {
      console.log(error);
    }
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
            <p>Edit Price</p>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="form-control text-center"
              id="exampleInputEmail1"
              placeholder="Enter your price"
              required
            />
            <button type="submit" className="m-2 btn btn-primary">
              Use This Price!
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

export default AdminUpdateProduct;
