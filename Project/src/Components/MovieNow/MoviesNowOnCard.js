import React, { useState, useEffect } from "react";
import Pagination from "../Pagination";
import { motion } from "framer-motion";
import propTypes from "prop-types";
import queryString from "query-string";
import Rating from "./Rating";
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
    { id : '1', name: 'Top Đánh Giá', data : 'top_rated'},
    { id: '2', name : 'Sắp Chiếu', data: 'upcoming'},
    { id: '3', name :'Phổ Biến', data : 'popular'},
    { id: '4', name: 'Đang Chiếu', data: 'now_playing'}
  ]
  const [cate, setCate] = useState('popular')
  function handleBlind (data){
    setCate(data)
    setFilters(1)
  }
  const [postMovie, setPostMovie] = useState([]);
  useEffect(() => {
    async function fetchPostMovie() {
      const paramString = queryString.stringify(filters);
      const requestUrl = `http://localhost:5000/films/${cate}?${paramString}`;
      const response = await fetch(requestUrl);
      const responseJSON = await response.json();
      const { results } = responseJSON;
      setPostMovie(results);
      setPagination(responseJSON);
      }     
    fetchPostMovie();
  }, [filters,cate]);
   
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
      <div className ="typeMovie">
        {categories.map((index) =>(
          <div key ={index.name} className = "type-move-choose">
              <div onClick ={() => handleBlind(index.data)} className= "name-category">{index.name}</div>                    
          </div>
        ))}
      </div>
      <div className="list-movie-for-today">{Movies}</div>
      <Pagination pagination={pagination} onPageChange={handleOnPageChange} />
      <img src ="https://i.imgur.com/uDoxArg.gif" alt ="no advertisment"/>
    </div>
  );
}

export default Main;
