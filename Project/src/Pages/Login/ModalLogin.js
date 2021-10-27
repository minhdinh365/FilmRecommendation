import React, { useRef, useState } from "react";
import { useSpring, animated } from "react-spring";
import Field from "../../Components/Const/FieldOfLogin";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Axios from "axios";
import { useCookies } from "react-cookie";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import UseFullLoading from "../../Components/FullPageLoading";
import { PasswordInput, Background, WrapperModal, Content, InputField, OtherSign, Errors, Button } from './modalelementsLogin'

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
    setLoginOpen(false)
    setForgetOpen(true)
  }
  const onSubmit = (data) => {
    showLoader();
    Axios.post("http://localhost:5000/account", {
      username: data.username,
      password: data.password,
    })
      .then((res) => {
        if (res.data.status === "Susscess") {
          window.location.reload();
          setLoginOpen(false);
          setCookie("User", res.data.token, { path: "http://localhost:3000/" })
          if (registerUser) {
            window.location = 'http://localhost:3000'
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
  const [changeIcon, setchangeIcon] = useState(false)
  const [password, setPassword] = useState('password')
  const Showpass = () => {
    if (password === 'password') {
      setPassword('text')
      setchangeIcon(true)
    }
    else {
      setPassword('password')
      setchangeIcon(false)
    }
  }
  return (
    <>
      {loader}
      {open ? (
        <Background ref={modalRef} onClick={closeModal} open={open}>
          <animated.div style={animatedd}>
            <WrapperModal>
              <Content>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <h1>Đăng nhập</h1>
                  {Field.inputs.map((input, key) => {
                    return (
                      <div key={key}>
                        {
                          (input.span === 'Password') ?
                            <PasswordInput>
                              <span className="spanLogin">Mật khẩu</span>
                              <InputField
                                type={password}
                                placeholder={"Nhập vào mật khẩu"}
                                {...register(input.name)}
                                onChange={(e) => handle(e)}
                                id={input.name}
                                autoComplete="on"
                              ></InputField>
                              {changeIcon ?
                                <VisibilityIcon onClick={Showpass} fontSize="large" className="password-change-eye" />
                                :
                                <VisibilityOffIcon onClick={Showpass} fontSize="large" className="password-change-eye" />
                              }
                              <Errors>{errors[input.name]?.message}</Errors>
                            </PasswordInput>
                            :
                            <div className="username-input">
                              <span className="spanLogin">Tên đăng nhập</span>
                              <InputField
                                type='text'
                                placeholder={"Nhập vào mật khẩu"}
                                {...register(input.name)}
                                onChange={(e) => handle(e)}
                                id={input.name}
                                autoComplete="on"
                              ></InputField>
                              <Errors>{errors[input.name]?.message}</Errors>
                            </div>
                        }

                      </div>
                    );
                  })}
                  <Errors>{errorTM}</Errors>
                  <div className="text-right">
                    <p onClick={switchForget} style={{ color: "blue" }}>
                      Quên mật khẩu?
                    </p>
                  </div>
                  <div>
                    <Button type="submit">Đăng nhập</Button>
                  </div>
                  <OtherSign>
                    <a
                      href="http://localhost:3000/register"
                      style={{ justifyContent: "center", display: "flex" }}
                    >
                      Đăng kí
                    </a>
                  </OtherSign>
                </form>
              </Content>
            </WrapperModal>
          </animated.div>
        </Background>)
        : null}
    </>
  );
};
export default ModalLogin;
