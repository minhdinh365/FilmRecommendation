import { motion } from "framer-motion";
import propTypes from "prop-types";

const MovieBXH = (props) => {
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
        style={{ marginBottom: "60px", maxWidth: "320px" }}
      >
        <div
          style={{
            position: "relative",
            justifyContent: "center",
            width: "300px",
          }}
        >
          <img
            alt={`https://i.stack.imgur.com/kOnzy.gif`}
            src={`https://image.tmdb.org/t/p/w500/${props.movie.poster_path}`}
            style={{ minHeight: "450px" }}
          ></img>
        </div>
        <div
          className="title-Movie"
          style={{ display: "grid", placeItems: "center", overflow: "hidden" }}
        >
          <p
            style={{
              textAlign: "center",
              marginTop: "10px",
              fontSize: "18px",
              color: "blue",
            }}
          >
            Ngày khởi chiếu: {props.movie.release_date}
          </p>
          <p
            style={{ textAlign: "center", marginTop: "10px", fontSize: "21px" }}
          >
            {props.movie.title}
          </p>
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
