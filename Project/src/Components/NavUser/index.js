import React from "react";
import { HeaderUser, ImgLogo, Backhome } from "./NavUser";

export default function index() {
  return (
    <HeaderUser>
      <Backhome href="#/">
        <ImgLogo
          src={process.env.PUBLIC_URL + "/images/LOGOF.png"}
          className="Logo"
          alt="logo"
        />
      </Backhome>
    </HeaderUser>
  );
}
