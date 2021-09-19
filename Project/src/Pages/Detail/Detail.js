import React from "react";
import DetailMovieCard from "../components/DetailMovieCard";
import Review from "../classes/Review";
import Evaluate from "../components/EvaluateMovie";
const Detail = () => {
  let review = new Review(
    8,
    193,
    "The Tomorrow War",
    "The fight for tomorrow begins today.",
    "The world is stunned when a group of time travelers arrive from the year 2051 to deliver an urgent message: Thirty years in the future, mankind is losing a global war against a deadly alien species. The only hope for survival is for soldiers and civilians from the present to be transported to the future and join the fight. Among those recruited is high school teacher and family man Dan Forester. Determined to save the world for his young daughter, Dan teams up with a brilliant scientist and his estranged father in a desperate quest to rewrite the fate of the planet.",
    "2021-09-03",
    138,
    200000000,
    0,
    "https://image.tmdb.org/t/p/w500//34nDCQZwaEvsy4CFO5hkGRFDCVU.jpg"
  );
  return (
    <>
      <DetailMovieCard contents={review} />
      <Evaluate />
    </>
  );
};

export default Detail;
