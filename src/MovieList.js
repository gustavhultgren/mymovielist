import React, { useState, useRef } from "react";
import Movie from "./Movie";

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const titleInputRef = useRef();
  const ratingInputRef = useRef();
  let send;

  function addMovie() {
    send = true;

    // validation of user input
    if (
      titleInputRef.current.value === "" &&
      ratingInputRef.current.value < 1
    ) {
      send = false;
      alert("Du måste ange titel och rating!");
    } else if (
      titleInputRef.current.value === "" &&
      ratingInputRef.current.value > 0
    ) {
      send = false;
      alert("Du måste ange en titel!");
    } else if (
      titleInputRef.current.value !== "" &&
      ratingInputRef.current.value < 1
    ) {
      send = false;
      alert("Du måste ange rating!");
    }

    // if validation is ok
    if (send) {
      // create new id for the new movie
      //const newId = movies.length > 0 ? movies[movies.length - 1].id + 1 : 1;
      var newId = 1;
      movies.forEach((movie) => {
        if (movie.id >= newId) {
          newId = movie.id + 1;
        }
      });

      // update list of movies
      setMovies([
        ...movies,
        {
          id: newId,
          title: titleInputRef.current.value,
          rating: ratingInputRef.current.value,
        },
      ]);

      // clear input fields after adding
      titleInputRef.current.value = "";
      ratingInputRef.current.value = 0;
    }
  }

  function deleteMovie(id) {
    // update list of movies and filter out deleted movie
    setMovies(movies.filter((item) => item.id !== id));
  }

  function sortByTitle() {
    // copy of current movie list
    const newMovies = [...movies];

    // sort by title ascending
    newMovies.sort(function (a, b) {
      // to uppercase to ignore upper and lowercase diff
      var titleA = a.title.toUpperCase();
      var titleB = b.title.toUpperCase();

      if (titleA < titleB) {
        return -1;
      } else if (titleA > titleB) {
        return 1;
      } else {
        return 0;
      }
    });

    // update state
    setMovies(newMovies);
  }

  function sortByRating() {
    // copy of current movie list
    const newMovies = [...movies];

    // sort by rating descending
    newMovies.sort(function (a, b) {
      return b.rating - a.rating;
    });

    // update state
    setMovies(newMovies);
  }
  console.log("Movies: ", movies);
  return (
    <div>
      <h3>Add movie</h3>

      <input
        className="form-control"
        placeholder="Movie title..."
        ref={titleInputRef}
      />
      <select
        type="text"
        id="rating"
        className="form-control mt-2"
        ref={ratingInputRef}
      >
        <option value="0">Choose rating...</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <button className="btn btn-primary mt-2" onClick={addMovie}>
        Add
      </button>
      <ul className="list-group">
        {movies.map((movie) => (
          <Movie key={movie.id} movie={movie} deleteMovie={deleteMovie} />
        ))}
      </ul>

      <p className="mt-2">Order by</p>
      <button
        className="btn btn-outline-secondary btn-sm mr-1"
        onClick={() => sortByTitle()}
      >
        Title
      </button>
      <button
        className="btn btn-outline-secondary btn-sm"
        onClick={() => sortByRating()}
      >
        Rating
      </button>
    </div>
  );
}
