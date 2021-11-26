import React, { useEffect } from "react";
import SignUp from "../../Components/Register/index";
import HeaderUser from '../../Components/NavUser'
const Register = () => {
  useEffect(() => {
    document.title = "Đăng kí tài khoản"
  })
  return (
    <>
      <HeaderUser />
      <SignUp />
    </>
  );
};

export default Register;
