import React from "react";
import { Link } from "react-router-dom";
import "./PageNotFound.css";

const PageNotFound = () => {
  return (
    <>
      <div class="container">
        <h1>404</h1>
        <h2>Oops! Page not found.</h2>
        <p>We can't find the page you're looking for.</p>
        <Link to="/">Go back home</Link>
      </div>
    </>
  );
};

export default PageNotFound;
