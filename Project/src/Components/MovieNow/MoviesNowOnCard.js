import { Container, Row } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { URL_DETAIL, API_KEY } from "../../API/const";
import Pagination from "../Pagination";
import { motion } from "framer-motion";
import propTypes from "prop-types";
import queryString from "query-string";
import Rating from "./Rating";
import styled from "styled-components";
const Title = styled.span`
  display: block;
  width: 80%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
`;

const MovieCard = (props) => {
  return (
    <div>
      <motion.div
        key={props.movie.id}
        className="columns portfolio-item"
        whileHover={{
          scale: 1.06,
          textShadow: "0 0 8px rgb (255,255,255)",
          boxShadow: "0 0 8px rgb (255,255,255)",
        }}
        style={{ marginBottom: "60px", maxWidth: "330px" }}
      >
        <div
          style={{
            position: "relative",
            justifyContent: "center",
            width: "300px",
          }}
        >
          <img
            alt={`${props.movie.title} Movie Poster`}
            src={`https://image.tmdb.org/t/p/w500/${props.movie.poster_path}`}
            style={{ minHeight: "450px" }}
          ></img>
        </div>
        <div
          className="title-Movie"
          style={{ display: "grid", placeItems: "center", overflow: "hidden" }}
        >
          <Title>{props.movie.title}</Title>
          <Rating
            number={
              props.movie.vote_average != ""
                ? Math.ceil(props.movie.vote_average)
                : 9
            }
          ></Rating>
          <span style={{ fontWeight: 600, color: "blue", fontSize: "2.5vh" }}>
            Xem Ngay
          </span>
        </div>
      </motion.div>
    </div>
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
    <Container>
      <Row>{Movies}</Row>
      <Pagination pagination={pagination} onPageChange={handleOnPageChange} />
    </Container>
  );
}

export default Main;
