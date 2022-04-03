import React, { useState, useEffect } from "react";
import Header from "../../Components/Header/NavBar";
import Footer from "../../Components/Footer";
import { Container, SearchFor, ContainerFilter } from "./search";
import { motion } from "framer-motion";
import propTypes from "prop-types";
import { Link, useRouteMatch } from "react-router-dom";
import axios from "axios";
import { LocalhostApi } from "../../API/const";


const Search = () => {

  const {
    params: { name },
  } = useRouteMatch("/search/:name");
  document.title = `Tìm kiếm cho ${name.split('-').join(' ')}`
  return (
    <div className="search_page">
      <Header />
      <Container>
        <Recommandation></Recommandation>
      </Container>
      <Footer />
    </div>
  )
};
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
          <h3>{props.movie.release_date}</h3>
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

const Recommandation = () => {

  const {
    params: { name },
  } = useRouteMatch("/search/:name");

  const [postMovie, setPostMovie] = useState([]);
  useEffect(() => {
    let isActive = false;
    if (!isActive) {
      if (name != "") {
        axios.get(LocalhostApi + "search/" + name.split('-').join(' ')).then((data) => {
          setPostMovie(data.data.film);
        });
      }
    }

    return () => {
      isActive = true;
    };
  }, [name]);

  function custom_sort_up(a, b) {
    return new Date(a.release_date).getTime() - new Date(b.release_date).getTime();
  }
  function custom_sort_down(a, b) {
    return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
  }
  const filterByDate = (e) => {
    postMovie.sort(custom_sort_up);
    console.log(postMovie);
  }

  const [filterDate, setFilterDate] = useState(0);

  const filerBydate = (event) => {
    if (parseInt(event.target.value) == 1) {
      setFilterDate(1);
    }
    else if (parseInt(event.target.value) == 2) setFilterDate(2);
  };

  useEffect(() => {
    // set filer by date
    if (filterDate == 2) {
      setPostMovie(postMovie.sort(custom_sort_up));
    }
    else if (filterDate == 1) setPostMovie(postMovie.sort(custom_sort_down));

    // set filter by category
    return () => {
      setFilterDate(0);
    }
  }, [filterDate])
  const Movies = postMovie
    .slice(0, 20)
    .map((movie) => <MovieCard key={movie.id} movie={movie} />);

  return (
    <div className="search_results">
      <div className="movie-for-today">
        <ContainerFilter>
          <SearchFor>Tìm kiếm cho "{name.split('-').join(' ')}"      <span><ion-icon name="funnel"></ion-icon>Lọc</span></SearchFor>

          <>
            <select onChange={(e) => { filerBydate(e) }} >
              <option value="" selected disabled hidden>Xếp theo ngày</option>
              <option value="1" >Mới nhất</option>
              <option value="2" >Cũ nhất</option>
            </select>
          </>
        </ContainerFilter>
        <div className="list-movie-for-today">{Movies}</div>
      </div>
    </div>
  );
};
Recommandation.propTypes = {
  id: propTypes.number.isRequired,
};
export default Search;
