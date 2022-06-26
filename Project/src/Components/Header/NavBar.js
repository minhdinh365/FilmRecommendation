import React, { useState, useEffect } from "react";
import ModalSign from "../../Pages/Login/ModalLogin";
import ModalForget from "../../Pages/Login/ModalForget";
import { CSSTransition } from "react-transition-group";
import Search from "../Search";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { Link as LinkRouter } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import { LocalhostApi } from "../../API/const";
import { Link, animateScroll as scroll } from "react-scroll";

export default function NavBar({ isHome }) {
  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  /*Responsive when the creen less than 1024px*/
  useEffect(() => {
    let isAcctive = false;
    const mediaQuery = window.matchMedia("(max-width: 1024px)");
    if (!isAcctive) {
      mediaQuery.addEventListener("resize", handleMediaQueryChange);
      handleMediaQueryChange(mediaQuery);
    }
    return () => {
      isAcctive = true;
      mediaQuery.removeEventListener("resize", handleMediaQueryChange);
      setIsSmallScreen(null);
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
  const [avatar, setAvatar] = useState("");
  const [success, setSuccess] = useState("");
  useEffect(() => {
    let isCancel = false;
    if (!isCancel) {
      setCookiesF();
      if (success !== "") {
        axios.get(LocalhostApi + "infor?username=" + success).then((data) => {
          setAvatar(data.data.account.avatar);
          window.localStorage.setItem("avatar", data.data.account.avatar);
        });
      }
    }
    return () => {
      isCancel = true;
    };
  }, [success]);
  async function setCookiesF() {
    const cookieUser = Cookies.get("User");
    if (cookieUser) {
      await setSuccess(jwt_decode(cookieUser).username);
    }
  }
  /*State show modal login*/
  const [loginOpen, setLoginOpen] = useState(false);
  const [forgetOpen, setForgetOpen] = useState(false);
  const handleLogin = (event) => {
    setLoginOpen(true);
  };
  function Mix() {
    toggleNav();
    handleLogin();
  }
  async function Logout() {
    document.cookie = "User=; expires= Thu, 01 Jan 1970 00:00:01 GMT;";
    window.localStorage.clear();
    window.location.reload();
  }
  const [Navbar, setNavbar] = useState(false);

  const changBackgroundNavbar = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  const [section, setSection] = useState("home");
  useEffect(() => {
    let sections = document.querySelectorAll("section");

    window.addEventListener("scroll", () => {
      let currnent = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset > sectionTop - sectionHeight / 20) {
          currnent = section.getAttribute("id");
        }
      });
      setSection(currnent);
    });
    return () => {
      window.removeEventListener("scroll", () => { });
    };
  }, []);
  window.addEventListener("scroll", changBackgroundNavbar);
  const [listNav, setListNav] = useState([
    { id: 1, name: "Trang chủ", section: "home" },
    { id: 1, name: "Đang công chiếu", section: "bxhm" },
    { id: 1, name: "Phim cho bạn", section: "portfolio" },
    { id: 1, name: "Giới thiệu", section: "about" },
    { id: 1, name: "Liên hệ", section: "contact" },
  ]);
  return (
    <div className={Navbar ? "Header color" : "Header"}>
      <ModalSign
        open={loginOpen}
        setLoginOpen={setLoginOpen}
        setForgetOpen={setForgetOpen}
      ></ModalSign>
      <ModalForget
        open={forgetOpen}
        setLoginOpen={setLoginOpen}
        setForgetOpen={setForgetOpen}
      ></ModalForget>
      <LinkRouter to="/" onClick={toggleNav}>
        <img
          src={process.env.PUBLIC_URL + "/images/LOGOF.png"}
          className="Logo"
          alt="logo"
        />
      </LinkRouter>
      <CSSTransition
        in={!isSmallScreen || isNavVisible}
        timeout={0}
        classNames="NavAnimation"
        unmountOnExit
      >
        <nav className="Nav">
          {listNav.map((element) => {
            return (
              isHome ?
                <Link
                  key={element.section}
                  activeClass={
                    element.section === section
                      ? "smoothscroll current"
                      : "smoothscroll"
                  }
                  to={element.section}
                  spy={true}
                  smooth={true}
                  hashSpy={true}
                  offset={50}
                  duration={500}
                  isDynamic={true}
                  ignoreCancelEvents={false}
                  spyThrottle={500}
                  onClick={toggleNav}
                >
                  {element.name}
                </Link>
                : <div style={{ width: "100px" }}></div>
            );
          })}
          {isSmallScreen ? null : <Search className="hidden-input"></Search>}
          {success !== "" ? (
            <div className="dropdown">
              <a className="login-navbar">{success}</a>
              <Avatar
                alt={success}
                src={window.localStorage.getItem("avatar")}
              />
              <div className="dropdown-content">
                <p>
                  <a href="/#/inforuser">Thông tin</a>
                </p>
                <p>
                  <a href="/#/activities">Hoạt động</a>
                </p>
                <p>
                  <a href="/#/upgrade_user">Nâng cấp</a>
                </p>
                <p onClick={Logout}>Thoát</p>
              </div>
            </div>
          ) : (
            <>
              <a onClick={Mix} className="login-navbar">
                Đăng nhập
              </a>
              <a href="/#/register">
                <button>Đăng kí</button>
              </a>
            </>
          )}
        </nav>
      </CSSTransition>
      <div className="after-responsive">
        <Search />
        <button onClick={toggleNav} className="Burger">
          <MenuIcon className="menu-burger" fontSize="large" />
        </button>
      </div>
    </div>
  );
}
