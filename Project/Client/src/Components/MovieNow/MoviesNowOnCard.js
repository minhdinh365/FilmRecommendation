import React, { useState, useEffect } from "react";
import { URL_DETAIL, API_KEY } from "../../API/const";
import Pagination from "../Pagination";
import { motion } from "framer-motion";
import propTypes from "prop-types";
import queryString from "query-string";
import Rating from "./Rating";
import axios from 'axios';
import {Link} from 'react-router-dom'

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
      state: props.movie.id // your data array of objects
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

function Main() {
  const [pagination, setPagination] = useState({
    page: 2,
    results: [],
    total_pages: 500,
    total_results: 10000,
  });
  const [filters, setFilters] = useState({
    page: 2,
  });
  const [postMovie, setPostMovie] = useState([]);
  useEffect(() => {
    async function fetchPostMovie() {
      const paramString = queryString.stringify(filters);
      const requestUrl = `${URL_DETAIL}popular${API_KEY}&language=en-US&${paramString}`;
      const response = await fetch(requestUrl);
      const responseJSON = await response.json();
      const { results } = responseJSON;
      setPostMovie(results);
      setPagination(responseJSON);
    }
    fetchPostMovie();
  }, [filters]);
  function handleOnPageChange(newPage) {
    setFilters({
      ...filters,
      page: newPage,
    });
  }
  const Movies = postMovie.map((movie) => (
    <MovieCard key={movie.id} movie={movie} />
  ));
  return (
    <div className="movie-for-today">
      <div className="list-movie-for-today">{Movies}</div>
      <Pagination pagination={pagination} onPageChange={handleOnPageChange} />
    </div>
  );
}

export default Main;


// const paramString = queryString.stringify(filters);
// const requestUrl = `${URL_DETAIL}popular${API_KEY}&language=en-US&${paramString}`;
// const response = await fetch(requestUrl);
// const responseJSON = await response.json();
// const { results } = responseJSON;
// setPostMovie(results);
// setPagination(responseJSON);
// axios.post('http://localhost:5000/films', {
//   films : responseJSON.results,
// })
// .then(function (response) {
//   console.log(response);
// })
// .catch(function (error) {
//   console.log(error);
// });