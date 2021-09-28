import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import Field from "../../Components/Const/FieldOfLogin";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Axios from "axios";
import { useCookies } from "react-cookie";
import UseFullLoading from "../../Components/FullPageLoading";
import ModalForget from "./ModalForget";

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 12;
`;
const WrapperModal = styled.div`
  margin-top: 90px;
  width: 400px;
  height: 600px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: rgb(255, 255, 255);
  color: #000;
  display: grid;
  grid-template-rows: 1fr 1fr;
  position: relative;
  z-index: 10;
  border-radius: 10px;

  padding: 10px;
`;
const Content = styled.div`
  justify-content: center;
  padding: 30px;
  p {
    margin-bottom: 1rem;
  }
  button {
    padding: 10px 20px;
    background-color: #5b83e3;
    color: #fff;
    border: none;
    width: 100%;
    border-radius: 10px;
    margin: 20px 0px;
  }
  h1 {
    display: block;
    justify-content: center;
    font-family: Poppins-Bold;
    font-size: 30px;
    color: #333;
    line-height: 1.2;
    text-align: center;
    font-weight: 600;
  }
  input {
    font-family: Poppins-Medium;
    font-size: 16px;
    line-height: 1.2;
    display: block;
    width: 100%;
    height: 55px;
    background: 0 0;
    padding: 0 7px 0 13px;
    border-bottom: #6ea6ce;
  }
  i {
    padding: 0px 5px;
    width: 20px;
    height: 20px;
  }
`;
const InputField = styled.input`
  border-top-style: hidden;
  border-right-style: hidden;
  border-bottom-style: groove;
  color: black;
`;
const OtherSign = styled.div`
  margin-top: 60px;
  justify-content: center;
  display: grid;
`;
const Errors = styled.div`
  color: red;
  justify-content: center;
  display: flex;
`;
const Button = styled.button`
  height: 60px;
  font-size: 23px;
  padding: 10px 20px;
  background-color: #5b83e3;
  color: #fff;
  border: none;
  width: 100%;
  border-radius: 10px;
  margin: 20px 0px;
`
const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

export const ModalLogin = ({ showModal, setShowModal }) => {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
  });
  const [errorTM, setErrorTM] = useState();
  const { errors } = formState;
  const [cookies, setCookie] = useCookies(["User"]);
  const [loader, showLoader, hideLoader] = UseFullLoading();
  const [showModalForget, setShowModalForget] = useState(false);
  const OpenModalForget = () => {
    setShowModal(false);
    setShowModalForget(true);
  };
  const onSubmit = (data) => {
    showLoader();
    Axios.post("http://localhost:5000/account", {
      username: data.username,
      password: data.password,
    })
      .then((res) => {
        if (res.data.status === "Susscess") {
          window.location.reload();
          hideLoader();
          setShowModal(false);
          setCookie("User", res.data.token, { path: "http://localhost:3000/"})
        } else {
          hideLoader();
          setErrorTM("Tên tài khoản hoặc mật khẩu không đúng");
        }
      })
      .catch((e) => {
        hideLoader();
        alert("Server was wrong !!!!");
      });
  };
  const modalRef = useRef();
  const animatedd = useSpring({
    config: {
      duration: 250,
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateY(0%)` : `translateX(-100%)`,
  });
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  function handle(e) {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
    setErrorTM(null);
  }
  return (
    <>
      {showModal ? (
        <Background ref={modalRef} onClick={closeModal}>
          {loader}
          <animated.div style={animatedd}>
            <WrapperModal showModal={showModal}>
              <Content>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <h1>Đăng nhập</h1>
                  {Field.inputs.map((input, key) => {
                    return (
                      <div key={key}>
                        <span>{input.span}</span>
                        <InputField
                          style={{ color: "black" }}
                          type={input.text}
                          placeholder={"Type Your " + input.span}
                          {...register(input.name)}
                          onChange={(e) => handle(e)}
                          id={input.name}
                        ></InputField>
                        <Errors>{errors[input.name]?.message}</Errors>
                      </div>
                    );
                  })}
                  <Errors>{errorTM}</Errors>
                  <div className="text-right">
                    <p onClick={OpenModalForget} style={{ color: "blue" }}>
                      Forgot password?
                    </p>
                  </div>
                  <div>
                    <Button type="submit">Login</Button>
                  </div>
                  <OtherSign>
                    <span>Or Sign Up Using</span>
                    <a
                      href="fb.com"
                      style={{ justifyContent: "center", display: "flex" }}
                    >
                      Sign Up
                    </a>
                  </OtherSign>
                </form>
              </Content>
            </WrapperModal>
          </animated.div>
        </Background>
      ) : (
        <ModalForget
          showModalForget={showModalForget}
          setShowModalForget={setShowModalForget}
        ></ModalForget>
      )}
    </>
  );
};
export default ModalLogin;
