import React, { useState, useEffect } from "react";
import Fade from "react-reveal";
import ModalQuestions from "../QuestionSearch";
import NavBar from "./NavBar";
import { LocalhostApi } from "../../API/const";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Backdrop from "@mui/material/Backdrop";

function Header() {
  const [showModalQuestions, setShowModalQuestions] = useState(false);
  /*Show modal questions*/
  const [postMovie, setPostMovie] = useState([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(true);
    let isAcctive = false;
    async function fetchPostMovie() {
      try {
        const requestUrl = `${LocalhostApi}films/popular?page=1`;
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        const { results } = responseJSON;
        setPostMovie(results);
        setOpen(false);
      } catch (e) { }
    }
    if (!isAcctive) {
      fetchPostMovie();
    }
    return () => {
      isAcctive = true;
    };
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: false,
    autoplaySpeed: 4000,
    ltr: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: false,
        },
      },
    ],
  };
  return (
    <section id="home">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
      </Backdrop>
      <div className="modal-home-movie">
        <ModalQuestions
          showModalQuestions={showModalQuestions}
          setShowModalQuestions={setShowModalQuestions}
        ></ModalQuestions>
      </div>
      <NavBar />
      <div className="Header-banner">
        <Slider {...settings}>
          {postMovie.map((element) => {
            return (
              <div className="wrapper-hero" key={element.id}>
                <img
                  className="img-movie-banner"
                  src={`${element.backdrop_path}`}
                />
                <div className="detail-movie-banner">
                  <div className="detail-movie-banner-title">
                    <Fade bottom duration={2000}>
                      <h1>{element.title}</h1>
                      <span>{element.overview}</span>
                      <Link
                        to={{
                          pathname: `/detail/${element.id}`,
                          state: element.id,
                        }}
                      >
                        <button className="button-32">Xem Ngay</button>
                      </Link>
                    </Fade>
                  </div>
                  <div className="detail-movie-banner-img">
                    <Fade top duration={2000}>
                      <img
                        className="movie-banner-img-right"
                        src={element.poster_path}
                      />
                    </Fade>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </section>
  );
}

export default Header;
