import React, { useState } from "react";
import Fade from "react-reveal";
// import Search from '../Search/Search'
import ModalSign from "../../Pages/Login/ModalLogin";
import styled from "styled-components";
import ModalQuestions from "../QuestionSearch";

const Wrapper = styled.div`
  justify-content: center;
  align-items: center;
  z-index: 10;
  height: 100vh;
`;

function Header() {
  const [success, setSuccess] = useState({
    username: "",
  });
  const [showModalLogin, setShowModalLogin] = useState(false);

  const OpenModalLogin = () => {
    setShowModalLogin((prev) => !prev);
  };
  const [showModalQuestions, setShowModalQuestions] = useState(false);

  const OpenModalQuesitons = () => {
    setShowModalQuestions((prev) => !prev);
  };
  const mystyle = {
    width: "100px",
    height: "100px",
    marginTop: "0px",
  };
  const background = {
    backgroundImage: `url(https://i.ytimg.com/vi/vz-gdEL_ae8/maxresdefault.jpg)`,
    backgroundSize: "cover",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <div style={background}>
      <Wrapper>
        <ModalSign
          showModal={showModalLogin}
          setShowModal={setShowModalLogin}
        ></ModalSign>
        <ModalQuestions
          showModalQuestions={showModalQuestions}
          setShowModalQuestions={setShowModalQuestions}
        ></ModalQuestions>
      </Wrapper>
      <header id="home">
        <nav id="nav-wrap" style={{ justifyContent: "bettwen-space" }}>
          <div
            className="HeaderMovie"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div className="logo">
              <a className="smoothscroll" href="#home">
                <img
                  alt=""
                  src={process.env.PUBLIC_URL + "/images/LOGOF.png"}
                  style={mystyle}
                ></img>
              </a>
            </div>
            <ul id="nav" className="nav" style={{ padding: "20px" }}>
              <li className="current">
                <a
                  className="smoothscroll"
                  href="#home"
                  style={{ fontSize: 12, marginRight: "10px" }}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  className="smoothscroll"
                  href="#bxhm"
                  style={{ fontSize: 12, marginRight: "10px" }}
                >
                  Bảng Xếp Hạng
                </a>
              </li>

              <li>
                <a
                  className="smoothscroll"
                  href="#portfolio"
                  style={{ fontSize: 12, marginRight: "10px" }}
                >
                  Phim cho bạn
                </a>
              </li>

              <li>
                <a
                  className="smoothscroll"
                  href="#about"
                  style={{ fontSize: 12, marginRight: "10px" }}
                >
                  Giới Thiệu
                </a>
              </li>

              <li>
                <a
                  className="smoothscroll"
                  href="#contact"
                  style={{ fontSize: 12, marginRight: "10px" }}
                >
                  Liên Hệ
                </a>
              </li>
            </ul>
          </div>
          <div className="headerAccount" style={{ marginLeft: "90px" }}>
            {success.username != "" ? (
              <ul id="nav" className="nav" style={{ padding: "12px" }}>
                <li>
                  <input placeholder="Search...." type="text" />
                </li>
                <li>
                  <select
                    style={{
                      backgroundColor: "#ffa50000",
                      color: "orange",
                      fonSize: "25px",
                      minWidth: "10px",
                    }}
                  >
                    <option value="A">Apple</option>
                    <option value="B">Banana</option>
                    <option value="C">Cranberry</option>
                  </select>
                </li>
              </ul>
            ) : (
              <ul id="nav" className="nav" style={{ padding: "12px" }}>
                <li>
                  <input
                    placeholder="Search...."
                    type="text"
                    style={{ outline: "2px white  ", padding: "10px 15px" }}
                  />
                </li>
                <li>
                  <a
                    href="fb.com"
                    className="smoothscroll"
                    onClick={OpenModalLogin}
                    style={{ fontSize: 12, marginRight: "10px" }}
                  >
                    Đăng Nhập
                  </a>
                </li>
                <li>
                  <a
                    href="fb.com"
                    className="smoothscroll"
                    style={{ fontSize: 12, marginRight: "10px" }}
                  >
                    Đăng Kí
                  </a>
                </li>
              </ul>
            )}
          </div>
        </nav>
        <div className="row banner">
          <div className="banner-text">
            <Fade bottom>
              <h1
                className="responsive-headline"
                style={{ fontFamily: "arial-blod" }}
              >
                Hãy cùng nhau trải nghiệm
              </h1>
            </Fade>
            <Fade bottom duration={1200}>
              <h3>Những bộ phim hay nhất.</h3>
            </Fade>
            <hr />
            <Fade bottom duration={2000}>
              <ul className="social">
                <a href="#portfolio" className="button btn project-btn">
                  <i
                    className="fa fa-film smoothscroll"
                    style={{ fontSize: "15px" }}
                  ></i>
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
    </div>
  );
}

export default Header;
