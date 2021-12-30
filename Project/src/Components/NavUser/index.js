import React, { useState, useEffect } from "react";
import { HeaderUser, ImgLogo, Backhome, InFoHeader } from "./NavUser";
import Avatar from "@mui/material/Avatar";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

export default function index() {
  const [success, setSuccess] = useState("");
  useEffect(() => {
    let isCancel = false;
    if (!isCancel) {
      setCookiesF();
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
  function Logout() {
    document.cookie = "User=; expires= Thu, 01 Jan 1970 00:00:01 GMT;";
    window.localStorage.clear();
    window.location = "#/";
  }
  return (
    <HeaderUser>
      <Backhome href="#/">
        <ImgLogo
          src={process.env.PUBLIC_URL + "/images/LOGOF.png"}
          className="Logo"
          alt="logo"
        />
      </Backhome>
      {window.localStorage.getItem("avatar") !== undefined ? (
        <InFoHeader>
          <div className="dropdown">
            <a className="login-navbar">{success}</a>
            <div className="dropdown-content">
              <p>
                <a href="/#/inforuser">Thông tin tài khoản</a>
              </p>
              <p>
                <a href="/#/activities">Hoạt động gần đây</a>
              </p>
              <p onClick={Logout}>Thoát</p>
            </div>
          </div>
          <Avatar alt={success} src={window.localStorage.getItem("avatar")} />
        </InFoHeader>
      ) : null}
    </HeaderUser>
  );
}
