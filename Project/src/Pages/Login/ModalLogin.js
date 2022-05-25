import React, { useRef, useState } from "react";
import { useSpring, animated } from "react-spring";
import Field from "../../Components/Const/FieldOfLogin";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Axios from "axios";
import { LocalhostClient } from "../../API/const";
import { LocalhostApi } from "../../API/const";
import { useCookies } from "react-cookie";
import Cookies from "js-cookie";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import UseFullLoading from "../../Components/FullPageLoading";
import {
  WapperLogo,
  PasswordInput,
  Background,
  WrapperModal,
  Content,
  InputField,
  OtherSign,
  Errors,
  Button,
} from "./modalelementsLogin";

const schema = yup.object().shape({
  username: yup.string().required("Tài khoản không được để trống"),
  password: yup.string().required("Mật khẩu không được để trống"),
});

function ModalLogin(props) {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
  });
  const [errorTM, setErrorTM] = useState();
  const { errors } = formState;
  const [cookies, setCookie] = useCookies(["User"]);
  const [loader, showLoader, hideLoader] = UseFullLoading();
  const { open, setLoginOpen, setForgetOpen, registerUser } = props;
  const switchForget = (event) => {
    setLoginOpen(false);
    setForgetOpen(true);
  };
  const onSubmit = (data) => {
    showLoader();
    Axios.post(LocalhostApi + "account", {
      username: data.username,
      password: data.password,
    })
      .then((res) => {
        if (res.data.status === "Susscess") {
          window.location.reload();
          setLoginOpen(false);
          if (!Cookies.get("User")) {
            setCookie("User", res.data.token, {
              path: LocalhostClient,
              maxAge: 86400,
            });
          } else {
            document.cookie = "User=; expires= Thu, 01 Jan 1970 00:00:01 GMT;";
            window.localStorage.clear();
            setCookie("User", res.data.token, {
              path: LocalhostClient,
              maxAge: 86400,
            });
          }
          if (registerUser) {
            window.location = LocalhostClient;
          }
          hideLoader();
        } else {
          hideLoader();
          setErrorTM("Tên tài khoản hoặc mật khẩu không đúng");
        }
      })
      .catch((e) => {
        hideLoader();
        setErrorTM("Kiểm tra lại kết nối internet của bạn");
      });
  };
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
      setLoginOpen(false);
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
  const [changeIcon, setchangeIcon] = useState(false);
  const [password, setPassword] = useState("password");
  const Showpass = () => {
    if (password === "password") {
      setPassword("text");
      setchangeIcon(true);
    } else {
      setPassword("password");
      setchangeIcon(false);
    }
  };
  return (
    <>
      {loader}
      {open ? (
        <Background ref={modalRef} onClick={closeModal} open={open}>
          <animated.div style={animatedd}>
            <WrapperModal>
              <Content>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <WapperLogo>
                    <img
                      src={process.env.PUBLIC_URL + "/images/LOGOF.png"}
                      className="Logo"
                      alt="logo"
                    />
                  </WapperLogo>
                  {Field.inputs.map((input, key) => {
                    return (
                      <div key={key}>
                        {input.span === "Password" ? (
                          <PasswordInput>
                            <span className="spanLogin">Mật khẩu</span>
                            <InputField
                              type={password}
                              placeholder={"Nhập vào mật khẩu*"}
                              {...register(input.name)}
                              onChange={(e) => handle(e)}
                              id={input.name}
                              autoComplete="on"
                            ></InputField>
                            {changeIcon ? (
                              <VisibilityIcon
                                color="secondary"
                                onClick={Showpass}
                                fontSize="large"
                                className="password-change-eye"
                              />
                            ) : (
                              <VisibilityOffIcon
                                color="secondary"
                                onClick={Showpass}
                                fontSize="large"
                                className="password-change-eye"
                              />
                            )}
                            <Errors>{errors[input.name]?.message}</Errors>
                          </PasswordInput>
                        ) : (
                          <div className="username-input">
                            <span className="spanLogin">Tên đăng nhập</span>
                            <InputField
                              type="text"
                              placeholder={"Nhập vào tên đăng nhập*"}
                              {...register(input.name)}
                              onChange={(e) => handle(e)}
                              id={input.name}
                              autoComplete="on"
                            ></InputField>
                            <Errors>{errors[input.name]?.message}</Errors>
                          </div>
                        )}
                      </div>
                    );
                  })}
                  <Errors>{errorTM}</Errors>
                  <div className="text-right">
                    <p onClick={switchForget} style={{ color: "white" }}>
                      Quên mật khẩu?
                    </p>
                  </div>
                  <Button type="submit">Đăng nhập</Button>
                  <OtherSign>
                    <a
                      href="/#/register"
                      style={{ justifyContent: "center", display: "flex" }}
                    >
                      Đăng kí
                    </a>
                  </OtherSign>
                </form>
              </Content>
            </WrapperModal>
          </animated.div>
        </Background>
      ) : null}
    </>
  );
}
export default ModalLogin;
