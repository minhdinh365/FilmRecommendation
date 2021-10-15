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
import {PasswordInput,Background,WrapperModal,Content,InputField,OtherSign,Errors,Button } from './modalelementsLogin'
import passwordHash from 'password-hash'

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
  const { open, setLoginOpen, setForgetOpen } = props;
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
          hideLoader();
          setLoginOpen(false);
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
  const Showpass =() =>{
    if(password === 'password'){
        setPassword('text')
        setchangeIcon(true)
    }
    else{
        setPassword('password')
        setchangeIcon(false)
    }
}
  return (
    <>
    {loader}
      {open? (
        <Background ref={modalRef} onClick={closeModal} open= {open}>    
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
                          <span className ="spanLogin">{input.span}</span>
                          <InputField
                            type={password}
                            placeholder={"Type Your " + input.span}
                            {...register(input.name)}
                            onChange={(e) => handle(e)}
                            id={input.name}
                          ></InputField>
                          {changeIcon ? 
                          <VisibilityIcon onClick= {Showpass} fontSize="large" className="password-change-eye"/>   
                          :
                          <VisibilityOffIcon onClick= {Showpass} fontSize="large" className="password-change-eye"/>   
                          }  
                          <Errors>{errors[input.name]?.message}</Errors>
                        </PasswordInput>
                        : 
                        <div className="username-input">
                          <span className ="spanLogin">{input.span}</span>
                          <InputField
                            type='text'
                            placeholder={"Type Your " + input.span}
                            {...register(input.name)}
                            onChange={(e) => handle(e)}
                            id={input.name}
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
        </Background>)
        : null}
    </>
  );
};
export default ModalLogin;
