import { motion } from "framer-motion";
import propTypes from "prop-types";

const MovieBXH = (props) => {
  return (
    <div>
      <motion.div
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
          <h4 className="chart-movie">Releas</h4>
        </div>
        <div className="title-movie-chart">
          <p>Khởi chiếu: {props.movie.release_date}</p>
          <h3>{props.movie.title}</h3>
        </div>
      </motion.div>
    </div>
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
