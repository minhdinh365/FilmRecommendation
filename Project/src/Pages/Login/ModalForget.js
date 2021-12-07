import React, { useRef, useState } from "react";
import { useSpring, animated } from "react-spring";
import { LocalhostApi } from "../../API/const";
import axios from "axios";
import * as yup from "yup";
import {
  BackgroundForget,
  WrapperModalForget,
  ContentForget,
  InputFieldForget,
  ErrorsForget,
  ButtonForget,
} from "./modalelementsForget";

function ModalForget(props) {
  const { open, setLoginOpen, setForgetOpen } = props;
  const switchLogin = (event) => {
    setLoginOpen(true);
    setForgetOpen(false);
  };

  const [value, setName] = useState("");
  const [func, setFunc] = useState({
    onSubmit: false,
    onVerify: false,
  });
  const [title, setTitle] = useState({
    type: "Email",
    placeholder: "Nhập vào email của bạn",
  });

  const [errors, setErrors] = useState({});
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

      setErrors({ message: "", color: "red" });
      setName("");
      setTitle({
        type: "Email",
        placeholder: "Nhập vào email của bạn",
      });
      setFunc({
        onSubmit: false,
        onVerify: false,
      });
    }
  };

  const onSubmit = (event) => {
    axios
      .post(LocalhostApi + "forgetpassword", { email: value })
      .then((response) => {
        if (response.status === 200) {
          setErrors({ message: response.data.message, color: "green" });
          setName("");
          setTitle({
            type: "Code",
            code: response.data.code,
            email: response.data.email,
            placeholder: "Nhập mã xác nhận được gửi cho bạn",
          });
          setFunc({
            onSubmit: true,
            onVerify: false,
          });
        } else {
          setTitle({ type: "Email", placeholder: "Nhập vào email của bạn" });
          setErrors({ message: response.data.message, color: "red" });
          setFunc({
            onSubmit: false,
            onVerify: false,
          });
        }
      })
      .catch((error) => {
        setTitle({ type: "Email", placeholder: "Nhập vào email của bạn" });
        setErrors({ message: error.message, color: "red" });
        setFunc({
          onSubmit: false,
          onVerify: false,
        });
      });
  };

  const onVerify = (event) => {
    if (value != title.code) {
      setErrors({ message: "Mã xác nhận không đúng", color: "red" });
      setFunc({
        onSubmit: true,
        onVerify: false,
      });
    } else {
      setErrors({
        message: "Vui lòng nhập mật khẩu mới của bạn",
        color: "green",
      });
      setTitle({
        type: "password",
        email: title.email,
        placeholder: "Nhập mật khẩu mới",
      });
      setName("");
      setFunc({
        onSubmit: true,
        onVerify: true,
      });
    }
  };

  const onChangePass = (event) => {
    axios
      .post(LocalhostApi + "changepassforget", {
        email: title.email,
        password: value,
      })
      .then((response) => {
        if (response.status === 200) {
          setErrors({ message: response.data.message, color: "green" });
          setName("");
          setTitle({
            type: "Email",
            placeholder: "Nhập vào email của bạn",
          });
          setFunc({
            onSubmit: false,
            onVerify: false,
          });
        } else {
          setErrors({ message: response.data.message, color: "red" });
          setFunc({
            onSubmit: true,
            onVerify: true,
          });
        }
      })
      .catch((error) => {
        setErrors({ message: error.message, color: "red" });
        setFunc({
          onSubmit: true,
          onVerify: true,
        });
      });
  };

  const handleForget = (event) => {
    if (!func.onSubmit) {
      onSubmit(event);
    } else if (!func.onVerify) {
      onVerify(event);
    } else {
      onChangePass(event);
    }
  };
  return (
    <>
      {open ? (
        <BackgroundForget ref={modalRef} onClick={closeModal} open={open}>
          <animated.div style={animatedd}>
            <WrapperModalForget open={open}>
              <ContentForget>
                <h1>Quên mật khẩu</h1>
                <ErrorsForget color={errors.color}>
                  {errors.message}
                </ErrorsForget>
                <span>{title.type}</span>
                <InputFieldForget
                  type={title.type == "password" ? "password" : "email"}
                  placeholder={title.placeholder}
                  name="email"
                  value={value}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="on"
                ></InputFieldForget>
                <div className="btnLogin">
                  <ButtonForget onClick={switchLogin}>Quay lại</ButtonForget>
                  <ButtonForget onClick={handleForget}>Tiếp tục</ButtonForget>
                </div>
              </ContentForget>
            </WrapperModalForget>
          </animated.div>
        </BackgroundForget>
      ) : null}
    </>
  );
}
export default ModalForget;
