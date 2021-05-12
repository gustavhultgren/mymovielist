import React from "react";
import starImg from "./images/star.png";

export default function Movie({ movie, deleteMovie }) {
  function getStars() {
    let stars = [];
    for (let i = 0; i < movie.rating; i++) {
      stars.push(
        <img
          key={i}
          style={{ width: "30px", marginRight: "5px" }}
          className="float-end"
          src={starImg}
          alt="Star"
        />
      );
    }
    return stars;
  }

  return (
    <li
      className="list-group-item mt-2"
      data-grade={movie.rating}
      data-title={movie.title}
    >
      {movie.title}
      <button
        className="btn btn-sm btn-danger float-end"
        onClick={() => deleteMovie(movie.id)}
      >
        X
      </button>
      {getStars()}
    </li>
  );
}
