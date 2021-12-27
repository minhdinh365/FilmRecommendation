import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Slider from "react-slick";
import { loadRecommend } from "../../Redux/actions/recommend";
import Skeleton from "@mui/material/Skeleton";
import { Link } from "react-router-dom";

export default function Recommend(props) {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    slidesToShow: 5,
    speed: 500,
    dots: false,
    prevArrow: false,
    nextArrow: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };
  const dispatch = useDispatch();
  useEffect(() => {
    let isActive = true;
    if (isActive) {
      dispatch(loadRecommend(props.user));
    }
    return (isActive = false);
  }, []);
  const { recommend } = useSelector((state) => state.recommend);
  const ske = [1, 2, 3, 4, 5, 6];
  return (
    <div>
      {recommend === undefined || recommend.length == 0 ? (
        <div>
          <Slider {...settings}>
            {ske.map((element) => {
              return (
                <div key={element} className="card-recommend-wait">
                  <Skeleton
                    sx={{ bgcolor: "gray" }}
                    variant="rectangular"
                    height={380}
                  />
                  <Skeleton sx={{ bgcolor: "gray" }} height={28} />
                  <Skeleton sx={{ bgcolor: "gray" }} height={18} />
                </div>
              );
            })}
          </Slider>
        </div>
      ) : (
        <div>
          <Slider {...settings}>
            {recommend.map((movie) => {
              return <CardMovie key={movie.title} movie={movie}></CardMovie>;
            })}
          </Slider>
        </div>
      )}
    </div>
  );
}

const CardMovie = (props) => {
  return (
    <div style={{ paddingBottom: "40px" }}>
      <Link
        to={{
          pathname: `/detail/${props.movie.id}`,
          state: props.movie.id,
        }}
      >
        <div className="card-recommend">
          <img className="card-recommend-img" src={props.movie.poster_path} />
          <div className="card-recommend-title">
            <h3>{props.movie.title}</h3>
            <div className="card-recommend-title-detail">
              <div>
                <span>
                  {props.movie.release_date.toString().substring(0, 4)}
                </span>
                <span>&nbsp; &#183; &nbsp;</span>
                <span>{props.movie.run_time} m</span>
              </div>
              <span>Movie</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
