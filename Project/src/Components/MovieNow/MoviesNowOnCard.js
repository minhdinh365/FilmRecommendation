import React, { useState, useEffect } from "react";
import Pagination from "../Pagination";
import { motion } from "framer-motion";
import propTypes from "prop-types";
import queryString from "query-string";
import Rating from "./Rating";
import { Link } from "react-router-dom";
import LoadingMovieLoad from "../LoadingMovie";
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
      <Link
        to={{
          pathname: `/detail/${props.movie.id}`,
          state: props.movie.id,
        }}
      >
        <div className="card-movie-now">
          <img
            alt={`${props.movie.title} Movie Poster`}
            src={props.movie.poster_path}
          />
          <div className="card-movie-now-tilte">
            <h2>{props.movie.title}</h2>
            <Rating
              number={
                props.movie.vote_average !== ""
                  ? Math.ceil(props.movie.vote_average)
                  : 9
              }
            ></Rating>
          </div>
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
    page: 1,
    results: [],
    total_pages: 500,
    total_results: 10000,
  });
  const [filters, setFilters] = useState({
    page: 1,
  });
  const categories = [
    {
      id: 1,
      name: "Top Đánh Giá",
      data: "top_rated",
      className: "type-move-choose",
    },
    {
      id: 2,
      name: "Sắp Chiếu",
      data: "upcoming",
      className: "type-move-choose",
    },
    { id: 3, name: "Phổ Biến", data: "popular", className: "type-move-choose" },
    {
      id: 4,
      name: "Đang Chiếu",
      data: "now_playing",
      className: "type-move-choose",
    },
  ];
  const [cate, setCate] = useState("popular");
  function handleBlind(data) {
    setCate(data);
    setFilters(1);
  }
  const [postMovie, setPostMovie] = useState([]);
  const [active, setActive] = useState(3);
  useEffect(() => {
    let isAcctive = false;
    async function fetchPostMovie() {
      try {
        showLoader();
        const paramString = queryString.stringify(filters);
        const requestUrl = `${LocalhostApi}films/${cate}?${paramString}`;
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        const { results } = responseJSON;
        setPostMovie(results);
        setPagination(responseJSON);
        hideLoader();
      } catch (e) {}
    }
    if (!isAcctive) {
      fetchPostMovie();
    }
    return () => {
      isAcctive = true;
    };
  }, [filters, cate]);

  function handleOnPageChange(newPage) {
    setFilters({
      ...filters,
      page: newPage,
    });
  }
  const Movies = postMovie.map((movie) => (
    <MovieCard key={movie.id} movie={movie} />
  ));
  function handleIndex(data) {
    setActive(data);
  }
  const [loader, showLoader, hideLoader] = LoadingMovieLoad();
  return (
    <div className="movie-for-today">
      <ul className="typeMovie">
        {categories.map((index) => (
          <li
            key={index.name}
            onClick={() => handleIndex(index.id)}
            className={index.className + (index.id === active ? " active" : "")}
          >
            <div
              onClick={() => handleBlind(index.data)}
              className="name-category"
            >
              {index.name}
            </div>
          </li>
        ))}
      </ul>
      <div className="list-movie-for-today">
        {Movies}
        {loader}
      </div>
      <Pagination pagination={pagination} onPageChange={handleOnPageChange} />
      <img src="https://i.imgur.com/uDoxArg.gif" alt="no advertisment" />
    </div>
  );
}

export default Main;
