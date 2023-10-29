import React, { Children } from "react";
import Navbar from "./Navbar";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
    <Helmet>
      <meta charSet="utf-8" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <title>{title}</title>
    </Helmet>
    <Navbar />
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
