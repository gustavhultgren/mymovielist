import React from "react";

export default function Movie({ movie, deleteMovie }) {
  function getStars() {
    let stars = [];
    for (let i = 0; i < movie.rating; i++) {
      stars.push(
        <img key={i} className="float-end" src="./images/star.png" alt="Star" />
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
