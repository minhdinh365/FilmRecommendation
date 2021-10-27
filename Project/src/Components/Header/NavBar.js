import React, { useState, useEffect } from "react";
import ModalSign from "../../Pages/Login/ModalLogin";
import ModalForget from "../../Pages/Login/ModalForget";
import { CSSTransition } from "react-transition-group";
import Search from '../Search/Search';
import Cookies from 'js-cookie';
import Cookies2 from 'universal-cookie';
import jwt_decode from 'jwt-decode';
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';

export default function NavBar() {
  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  /*Responsive when the creen less than 1024px*/
  useEffect(() => {
    let isAcctive = false;
    const mediaQuery = window.matchMedia("(max-width: 1024px)");
    if (!isAcctive) {
      mediaQuery.addListener(handleMediaQueryChange);
      handleMediaQueryChange(mediaQuery);
    }
    return () => {
      isAcctive = true
      mediaQuery.removeListener(handleMediaQueryChange);
      setIsSmallScreen(null)
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
  const [success, setSuccess] = useState('');
  useEffect(() => {
    let isCancel = false;
    if (!isCancel) {
      setCookiesF();
    }
    return () => {
      isCancel = true
    }
  }, [])
  async function setCookiesF() {
    const cookieUser = Cookies.get('User')
    if (cookieUser) {
      await setSuccess(jwt_decode(cookieUser).username)
    }
  }
  /*State show modal login*/
  const [loginOpen, setLoginOpen] = useState(false)
  const [forgetOpen, setForgetOpen] = useState(false)
  const handleLogin = (event) => {
    setLoginOpen(true)
  }
  function Mix() {
    toggleNav();
    handleLogin();
  }
  async function Logout() {
    const cookies = new Cookies2();
    await cookies.remove('User', { path: "/", domain: "localhost" });
    document.cookie = "User=; expires= Thu, 01 Jan 1970 00:00:01 GMT;"
    window.location.reload()
  }
  const [Navbar, setNavbar] = useState(false);

  const changBackgroundNavbar = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    }
    else {
      setNavbar(false);
    }
  }
  window.addEventListener('scroll', changBackgroundNavbar)
  return (
    <div className={Navbar ? 'Header color' : 'Header'}>
      <ModalSign
        open={loginOpen} setLoginOpen={setLoginOpen} setForgetOpen={setForgetOpen}
      ></ModalSign>
      <ModalForget
        open={forgetOpen} setLoginOpen={setLoginOpen} setForgetOpen={setForgetOpen}
      ></ModalForget>
      <Link className="current" to="/" onClick={toggleNav}>

        <img
          src={process.env.PUBLIC_URL + "/images/LOGOF.png"}
          className="Logo"
          alt="logo"
        />
      </Link>
      <CSSTransition
        in={!isSmallScreen || isNavVisible}
        timeout={0}
        classNames="NavAnimation"
        unmountOnExit
      >
        <nav className="Nav">
          <a className="smoothscroll current" href="http://localhost:3000/#home" onClick={toggleNav}>
            Trang chủ
          </a>
          <a className="smoothscroll" href="http://localhost:3000/#bxhm" onClick={toggleNav}>
            Đang công chiếu
          </a>
          <a className="smoothscroll" href="http://localhost:3000/#portfolio" onClick={toggleNav}>
            Phim cho bạn
          </a>
          <a
            className="smoothscroll hiden-GT"
            href="/#about"
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
          <Search className="hidden-input"></Search>
          {(success !== '')
            ? (
              <>
                <a href="/inforuser" className="login-navbar">
                  {success}
                </a>
                <button onClick={Logout}>Thoát</button>
              </>
            ) : (
              <>
                <a onClick={Mix} className="login-navbar">
                  Đăng nhập
              </a>
                <a href="http://localhost:3000/register">
                  <button>Đăng kí</button>
                </a>
              </>
            )}
        </nav>
      </CSSTransition>
      <div className="after-responsive">
        <Search></Search>
        <button onClick={toggleNav} className="Burger">
          <MenuIcon className="menu-burger" fontSize="large" />
        </button>
      </div>
    </div>
  );
}
