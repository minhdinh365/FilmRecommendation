import React, { useState, useEffect } from "react";
import { URL_DETAIL, API_KEY } from "../../API/const";
import { motion } from "framer-motion";
import propTypes from "prop-types";
import Rating from "../MovieNow/Rating";
import {Link} from 'react-router-dom';
import axios from "axios";


const MovieCard = (props) => {
  return (
    <motion.div
      key={props.movie.id}
      className="col4-movie-now"
      whileHover={{
        scale: 1.06,
        textShadow: "0 0 8px rgb (255,255,255)",
        boxShadow: "0 0 8px rgb (255,255,255)",
    }}>
      <Link to={{
      pathname: `/detail/${props.movie.id}`,
      state: props.movie.id
      }}>
      <div className="card-movie-now">
        <img
          alt={`${props.movie.title} Movie Poster`}
          src={`https://image.tmdb.org/t/p/w500/${props.movie.poster_path}`}
        ></img>
        <h5 className="new-movie">Full HD</h5>
        <h2>{props.movie.title}</h2>
        <Rating
          number={
            props.movie.vote_average !== ""
              ? Math.ceil(props.movie.vote_average)
              : 9
          }
        ></Rating>
        <h3 className ="btn-XemNgay from-center">Xem Ngay</h3>
      </div>
      </Link>
    </motion.div>
  );
};
MovieCard.propTypes = {
  movie: propTypes.shape({
    title: propTypes.string.isRequired,
    poster_path: propTypes.string.isRequired,
    overview: propTypes.string.isRequired,
    id: propTypes.number.isRequired,
    vote_average: propTypes.number.isRequired,
  }).isRequired,
};

const Recommandation = (props) => {
  const [postMovie, setPostMovie] = useState([]);
  axios.get(
    `${URL_DETAIL}${props.id}/recommendations${API_KEY}&language=vi-VN&page=1`,
  )
  .then(res => {
     setPostMovie(res.data.results)
  })
  .catch(e => {
    alert('Errors')
  })
  const Movies = postMovie.slice(0,12).map((movie) => (
    <MovieCard key={movie.id} movie={movie} />
  ));
  return (
    <section id = "portfolio" style= {{backgroundColor: 'rgb(2,2,40)'}}>
      <div className="movie-for-today">
        <h1>Phim Liên Quan</h1>
        <div className="list-movie-for-today">{Movies}</div>
      </div>
    </section>
  );
}
Recommandation.propTypes ={
  id: propTypes.number.isRequired
}
export default Recommandation;
