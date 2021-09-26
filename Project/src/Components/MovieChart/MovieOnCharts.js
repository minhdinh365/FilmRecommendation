import { motion } from "framer-motion";
import propTypes from "prop-types";
import {Link} from 'react-router-dom'


const MovieBXH = (props) => {

  return (
    <Link to={{
      pathname: `/detail/${props.movie.id}`,
      state: props.movie.id // your data array of objects
    }}>
      <motion.div className ="card-chart"
        key={props.movie.id}
        whileHover={{
          scale: 1.06,
          textShadow: "0 0 8px rgb (255,255,255)",
          boxShadow: "0 0 8px rgb (255,255,255)",
        }}
      >
        <div className="card-movie-chart">
          <img
            alt={`https://i.stack.imgur.com/kOnzy.gif`}
            src={`https://image.tmdb.org/t/p/w500/${props.movie.poster_path}`}
          ></img>
          <h4 className="chart-movie">NEW</h4>
        </div>
        <div className="title-movie-chart">
          <p>Khởi chiếu: {props.movie.release_date}</p>
          <h3>{props.movie.title}</h3>
        </div>
      </motion.div>
    </Link>
  );
};

MovieBXH.propTypes = {
  movie: propTypes.shape({
    title: propTypes.string.isRequired,
    poster_path: propTypes.string.isRequired,
    overview: propTypes.string.isRequired,
    id: propTypes.number.isRequired,
    release_date: propTypes.string.isRequired,
  }).isRequired,
};

export default MovieBXH;
