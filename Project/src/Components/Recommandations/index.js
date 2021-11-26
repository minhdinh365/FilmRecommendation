import React, { useState, useEffect } from "react";
import { URL_DETAIL, API_KEY } from "../../API/const";
import { motion } from "framer-motion";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from "axios";
import { LocalhostApi } from "../../API/const";

const MovieCard = (props) => {
  return (
    <motion.div
      key={props.movie.id}
      className="col4-movie-now"
      whileHover={{
        scale: 1.06,
        textShadow: "0 0 8px rgb (255,255,255)",
        boxShadow: "0 0 8px rgb (255,255,255)",
      }}
    >
      <Link to={`/detail/${props.movie.id}`}>
        <div className="card-movie-now">
          <img
            alt={`${props.movie.title} Movie Poster`}
            src={`https://image.tmdb.org/t/p/w500/${props.movie.poster_path}`}
          ></img>
          <h5 className="new-movie">Full HD</h5>
          <h2>{props.movie.title}</h2>
        </div>
      </Link>
    </motion.div>
  );
};
MovieCard.propTypes = {
  movie: propTypes.shape({
    title: propTypes.string.isRequired,
    poster_path: propTypes.string.isRequired,
    id: propTypes.number.isRequired,
  }).isRequired,
};

const Recommandation = (props) => {
  const [postMovie, setPostMovie] = useState([]);
  useEffect(() => {
    axios
      .get(`${LocalhostApi}recommendation/` + props.id)
      .then((res) => {
        setPostMovie(res.data);
      })
      .catch((e) => {
        alert("Errors");
      });
  }, []);
  const Movies = postMovie
    .slice(0, 12)
    .map((movie) => <MovieCard key={movie.id} movie={movie} />);
  return (
    <section id="portfolio">
      <div className="movie-for-today">
        <h1>Phim liên quan</h1>
        <div className="list-movie-for-today">{Movies}</div>
      </div>
    </section>
  );
};
Recommandation.propTypes = {
  id: propTypes.number.isRequired,
};
export default Recommandation;
