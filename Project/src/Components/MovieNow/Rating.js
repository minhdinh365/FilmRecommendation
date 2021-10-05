import * as React from "react";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import propTypes from "prop-types";

const labels = {
  1: "Useless",
  2: "Useless+",
  3: "Poor",
  4: "Poor+",
  5: "Ok",
  6: "Ok+",
  7: "Good",
  8: "Good+",
  9: "Excellent",
  10: "Excellent+",
};
Rating.protoType = {
  number: propTypes.number.isRequired,
};

export default function TextRating(props) {
  return (
    <div className="rating-movie-now">
      <Rating
        max={10}
        name="text-feedback"
        value={props.number}
        readOnly
        precision={1}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      <p>{labels[props.number]}</p>
    </div>
  );
}
