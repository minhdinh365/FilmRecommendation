import React, { useRef } from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
  margin-top: 10px;
  width: 400px;
  height: 300px;
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
  border-left-style: hidden;
  border-bottom-style: groove;
  color: black;
`;
const Errors = styled.div`
  color: red;
  justify-content: center;
  display: flex;
`;
const schema = yup.object().shape({
  email: yup.string().required("Email is not correct"),
});

export const ModalForget = ({ showModalForget, setShowModalForget }) => {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
  });
  const { errors } = formState;
  const modalRef = useRef();
  const animatedd = useSpring({
    config: {
      duration: 250,
    },
    opacity: showModalForget ? 1 : 0,
    transform: showModalForget ? `translateY(0%)` : `translateX(-100%)`,
  });
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModalForget(false);
    }
  };
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      {showModalForget ? (
        <Background ref={modalRef} onClick={closeModal}>
          <animated.div style={animatedd}>
            <WrapperModal showModalForget={showModalForget}>
              <Content>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <h1>Quên mật khẩu</h1>
                  <span>Email</span>
                  <InputField
                    style={{ color: "black" }}
                    type="email"
                    placeholder={"Type Your Email"}
                    name="email"
                  ></InputField>
                  <Errors>{errors.email?.message}</Errors>
                  <div style={{ display: "flex" }}>
                    <button type="submit">Forget</button>
                  </div>
                </form>
              </Content>
            </WrapperModal>
          </animated.div>
        </Background>
      ) : null}
    </>
  );
};
export default ModalForget;
