import React, { useState, useEffect } from "react";
import Fade from "react-reveal";
import ModalSign from "../../Pages/Login/ModalLogin";
import ModalQuestions from "../QuestionSearch";
import { CSSTransition } from "react-transition-group";

function Header() {
  /*State show nav bar responsive header*/
  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  /*Responsive when the creen less than 1024px*/
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1024px)");
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);
  /*set small when screen less than 1024px*/
  const handleMediaQueryChange = (mediaQuery) => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };
  /*State check login*/
  const [success, setSuccess] = useState({
    username: "",
  });
  /*State show modal login*/
  const [showModalLogin, setShowModalLogin] = useState(false);
  /*Show modal login*/
  const OpenModalLogin = () => {
    setShowModalLogin((prev) => !prev);
  };
  /*State modal questions*/
  const [showModalQuestions, setShowModalQuestions] = useState(false);
  /*Show modal questions*/
  const OpenModalQuesitons = () => {
    setShowModalQuestions((prev) => !prev);
  };
  function Mix() {
    toggleNav();
    OpenModalLogin();
  }
  return (
    <header id="home">
      <div className="modal-home-movie">
        <ModalSign
          showModal={showModalLogin}
          setShowModal={setShowModalLogin}
        ></ModalSign>
        <ModalQuestions
          showModalQuestions={showModalQuestions}
          setShowModalQuestions={setShowModalQuestions}
        ></ModalQuestions>
      </div>
      <div className="Header">
        <a className="smoothscroll current" href="#home" onClick={toggleNav}>
          <img
            href="#home"
            src={process.env.PUBLIC_URL + "/images/LOGOF.png"}
            className="Logo"
            alt="logo"
          />
        </a>
        <CSSTransition
          in={!isSmallScreen || isNavVisible}
          timeout={0}
          classNames="NavAnimation"
          unmountOnExit
        >
          <nav className="Nav">
            <a
              className="smoothscroll current"
              href="#home"
              onClick={toggleNav}
            >
              Home
            </a>
            <a className="smoothscroll" href="#bxhm" onClick={toggleNav}>
              Bảng xếp hạng
            </a>
            <a className="smoothscroll" href="#portfolio" onClick={toggleNav}>
              Phim cho bạn
            </a>
            <a
              className="smoothscroll hiden-GT"
              href="#about"
              onClick={toggleNav}
            >
              Giới thiệu
            </a>
            <a
              className="smoothscroll hiden-GT"
              href="#contact"
              onClick={toggleNav}
            >
              Liên hệ
            </a>
            <input
              className="hidden-input"
              placeholder="Search..."
              onClick={toggleNav}
            ></input>
            <a onClick={Mix} className="smoothscroll" href="#bxhm">
              Đăng nhập
            </a>
            <button>Sign up</button>
          </nav>
        </CSSTransition>
        <div className="after-responsive">
          <input placeholder="Search..."></input>
          <button onClick={toggleNav} className="Burger">
            🎞️
          </button>
        </div>
      </div>
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
