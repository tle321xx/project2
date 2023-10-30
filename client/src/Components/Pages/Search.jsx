import {useState} from "react";
import Layout from "../Layout/Layout";
import { useSearch } from "../Context/search"; 
const Search = () => {
  const [values, setValues] = useSearch();
  const [movies, setMovies] = useState([]);
  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Resuts</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          <form
        className="d-flex justify-content-center flex-wrap text-center"
        style={{ width: "2000px" }}
      >
        {values.results.map((movie, index) => (
          <div className="card m-2 pb-4" style={{ width: "18rem" }} key={index}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              height={"350px"}
            />
            <h5 className="pt-3">{movie.title.substring(0, 30)}</h5>
            <p>{movie.overview.substring(0, 100)}...</p>
            <p> Vote Average: {movie.vote_average}  </p>
            <p> Vote Count: {movie.vote_count}</p>
            <h5 className="pt-3">
              {movie.price ? `$${movie.price}` : "Price not available"}
            </h5>
            <button className="btn btn-primary m-2" type="submit">Add To Cart!</button>
          </div>
        ))}
      </form>
        </div>
      </div>
    </Layout>
  );
};

export default Search;