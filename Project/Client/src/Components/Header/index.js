import React, { useState, useEffect } from "react";
import Fade from "react-reveal";
import ModalQuestions from "../QuestionSearch";
import NavBar from "./NavBar";

function Header() {
  const [showModalQuestions, setShowModalQuestions] = useState(false);
  /*Show modal questions*/
  const OpenModalQuesitons = () => {
    setShowModalQuestions((prev) => !prev);
  };

  return (
    <header id="home">
      <div className="modal-home-movie">
        <ModalQuestions
          showModalQuestions={showModalQuestions}
          setShowModalQuestions={setShowModalQuestions}
        ></ModalQuestions>
      </div>
      <NavBar />
      <div className="Header-banner">
        <div className="banner-text">
          <Fade bottom>
            <h1 className="responsive-headline">Hãy cùng nhau trải nghiệm</h1>
          </Fade>
          <Fade bottom duration={1200}>
            <h3>Những bộ phim hay nhất.</h3>
          </Fade>
          <Fade bottom duration={2000}>
            <ul className="social">
              <a href="#portfolio" className="button btn project-btn">
                <i className="fa fa-film smoothscroll"></i>
                Xem Phim Thôi
              </a>
              <div
                onClick={OpenModalQuesitons}
                className="button btn github-btn"
              >
                <i className="fa fa-search"></i>Tìm Phim Nào
              </div>
            </ul>
          </Fade>
        </div>
      </div>
    </header>
  );
}

export default Header;
