import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
import axios from "axios";

const Layout = ({ children, title, description, keywords, author }) => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data } = await axios.get(
          "https://api.themoviedb.org/3/search/movie?api_key=d5ab7fc26b1d7286e6674614ce58ea5a&query=a"
        );
        setMovies(data.results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovies();
  }, []);

  console.log(movies)

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <div>
    <Helmet>
      <meta charSet="utf-8" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <title>{title}</title>
    </Helmet>
    <Navbar query={query} handleInputChange={handleInputChange}/>
    <main style={{ minHeight: "70vh" }}>
      <Toaster />
      {children}
    </main>
  </div>
  );
};

Layout.defaultProps = {
    title: "Ecommerce app - shop now",
    description: "mern stack project",
    keywords: "mern,react,node,mongodb",
    author: "Wachirawit",
  };

export default Layout;