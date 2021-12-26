import React, { useRef, useState } from "react";
import { useSpring, animated } from "react-spring";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import passwordHash from "password-hash";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LocalhostApi } from "../../API/const";
import {
  BackgroundForget,
  WrapperModalForget,
  ContentForget,
  InputFieldForget,
  Errors,
  ButtonForget,
} from "./modalChange";

const schema = yup.object().shape({
  passwordold: yup.string().required("Vui lòng nhập mật khẩu cũ"),
  passwordnew: yup
    .string()
    .required("Vui lòng nhập mật khẩu mới")
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Mật khẩu phải có ít nhất 8 kí tự, ghi hoa hoặc kí đặc biệt"
    ),
  passwordnew2: yup
    .string()
    .required("Vui lòng lại nhập mật khẩu mới")
    .oneOf([yup.ref("passwordnew"), null], "Mật khẩu mới không trùng khớp"),
});

const ModalForget = (props) => {
  const { open, account, setChangPass } = props;
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
      setChangPass(false);
    }
  };
  const close = (event) => {
    setChangPass(false);
  };
  const [data, setData] = useState({
    username: "",
    passwordold: "",
    passwordnew: "",
  });
  const [errorTM, setErrorTM] = useState("");
  function handle(e) {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
    setErrorTM(null);
  }
  const onSubmit = (data) => {
    let name = {
      username: account,
      password: data.passwordold,
      newpassword: passwordHash.generate(data.passwordnew),
    };
    console.log(name);
    axios.post(LocalhostApi + "changepass", name).then((data) => {
      if (data.data.status === false) {
        setErrorTM(data.data.mes);
      } else
        toast.success("Thay đổi mật khẩu thành công!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
    });
  };
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {open ? (
        <BackgroundForget ref={modalRef} onClick={closeModal} open={open}>
          <animated.div style={animatedd}>
            <WrapperModalForget open={open}>
              <ContentForget>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <h1>Thay đổi mật khẩu</h1>
                  <span>Mật khẩu cũ</span>
                  <InputFieldForget
                    type="password"
                    placeholder={"Nhập mật khẩu cũ..."}
                    name="passwordold"
                    {...register("passwordold")}
                    autoComplete="off"
                    onChange={(e) => handle(e)}
                  ></InputFieldForget>
                  <p>{errorTM}</p>
                  <Errors>{errors.passwordold?.message}</Errors>
                  <span>Mật khẩu mới</span>
                  <InputFieldForget
                    {...register("passwordnew")}
                    type="password"
                    onChange={(e) => handle(e)}
                    placeholder={"Nhập mật khẩu mới..."}
                    name="passwordnew"
                    autoComplete="off"
                  ></InputFieldForget>
                  <p></p>
                  <Errors>{errors.passwordnew?.message}</Errors>
                  <span>Nhập lại mật khẩu mới</span>
                  <InputFieldForget
                    {...register("passwordnew2")}
                    type="password"
                    placeholder={"Nhập lại mật khẩu mới..."}
                    name="passwordnew2"
                    onChange={(e) => handle(e)}
                    autoComplete="off"
                  ></InputFieldForget>
                  <p></p>
                  <Errors>{errors.passwordnew2?.message}</Errors>
                  <div className="btnLogin">
                    <ButtonForget onClick={close}> Hủy</ButtonForget>
                    <ButtonForget type="submit">Thay đổi</ButtonForget>
                  </div>
                </form>
              </ContentForget>
            </WrapperModalForget>
          </animated.div>
        </BackgroundForget>
      ) : null}
    </>
  );
};
export default ModalForget;
