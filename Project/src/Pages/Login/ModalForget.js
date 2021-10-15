import React, { useRef } from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {BackgroundForget, WrapperModalForget, ContentForget, InputFieldForget, ErrorsForget, ButtonForget} from './modalelementsForget';

const schema = yup.object().shape({
  email: yup.string().required("Email is not correct"),
});

function ModalForget (props){
  const { open, setLoginOpen, setForgetOpen } = props;
  const switchLogin = (event) => {
    setLoginOpen(true)
    setForgetOpen(false)
  }
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
  });
  const { errors } = formState;
  const modalRef = useRef();
  const animatedd = useSpring({
    config: {
      duration: 250,
    },
    opacity: open ? 1 : 0,
    transform: open ? `translateY(0%)` : `translateX(-100%)`,
  });
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setForgetOpen(false);
    }
  };
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      {open ?(
        <BackgroundForget ref={modalRef} onClick={closeModal} open= {open}>
          <animated.div style={animatedd}>
            <WrapperModalForget open = {open}>
              <ContentForget>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <h1>Quên mật khẩu</h1>
                  <ErrorsForget>{errors.email?.message}</ErrorsForget>
                  <span>Email</span>
                  <InputFieldForget
                    type="email"
                    placeholder={"Type Your Email"}
                    name="email"
                  ></InputFieldForget>        
                  <div className="btnLogin">
                    <ButtonForget onClick ={switchLogin}> Back</ButtonForget>
                    <ButtonForget type="submit">Forget</ButtonForget>
                  </div>
                </form>              
              </ContentForget>
            </WrapperModalForget>
          </animated.div>
        </BackgroundForget>)
        :null}
    </>
  );
};
export default ModalForget;
