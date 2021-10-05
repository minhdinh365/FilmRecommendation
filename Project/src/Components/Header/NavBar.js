import React, { useState, useEffect } from "react";
import ModalSign from "../../Pages/Login/ModalLogin";
import ModalForget from "../../Pages/Login/ModalForget";
import { CSSTransition } from "react-transition-group";
import Search from '../Search/Search';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import { Link } from "react-router-dom";

export default function NavBar() {
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
  const cookieUser = Cookies.get('User')
  const [success, setSuccess] = useState('');
  useEffect(() => {
    if(cookieUser){
      setSuccess(jwt_decode(cookieUser).username)
    }
  }, [cookieUser])
  
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
  function Logout() {
      Cookies.remove('User', {path: "http://localhost:3000/"})
      window.location.reload()
  }
  const [Navbar, setNavbar] = useState(false);

  const changBackgroundNavbar = () =>{
    if(window.scrollY >= 111){
      setNavbar(true);
    }
    else{
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
      <Link className="current" to ="/"  onClick={toggleNav}>
    
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
            Home
          </a>
          <a className="smoothscroll" href="http://localhost:3000/#bxhm" onClick={toggleNav}>
            Bảng xếp hạng
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
          <Search className = "hidden-input"></Search>
          {(success !== '')
          ? (
            <>
              <a href= "/inforuser" className="login-navbar">
                <img
                  src={process.env.PUBLIC_URL + "/images/LOGOF.png"}
               />
              {success}
              </a>
              <button onClick ={Logout}>Log out</button>
            </>
          ) : (
            <>
              <a onClick={Mix} className="login-navbar">
                Đăng nhập
              </a>
              <a href ="http://localhost:3000/register">
                <button>Sign up</button>
              </a>
            </>
          )}
        </nav>
      </CSSTransition>
      <div className="after-responsive">
        <Search></Search>
        <button onClick={toggleNav} className="Burger">
          🎞️
        </button>
      </div>
    </div>
  );
}
