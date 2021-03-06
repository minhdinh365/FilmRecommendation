import React, { useState } from "react";
import axios from "axios";
import passwordHash from "password-hash";
import SuccessRegister from "./SuccessRegister";
import {
  Form,
  Card,
  Upload,
  Image,
  UpdateButton,
  Information,
  Title,
  RegisterButton,
  ImageTemp,
  Announcement,
  ImgBG,
  ImgBGu,
  Introduce,
} from "./RegisterElement";
import { TextField } from "@material-ui/core";
import { LocalhostApi } from "../../API/const";

const SignUp = () => {
  var regex = new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
  let [announcement, setAnnouncement] = useState("");

  let [textInput, setTextInput] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
    RePassword: "",
  });

  let [errorMessage, setErrorMessage] = useState({
    checkFirstName: false,
    checkLastName: false,
    checkEmail: false,
    checkPassword: false,
    checkRePassword: false,
    errorFirstName: "",
    errorLastName: "",
    errorEmail: "",
    errorPassword: "",
    errorRePassword: "",
  });
  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);

  const checkTextInput = (e) => {
    //check first name
    if (!textInput.FirstName.trim()) {
      setErrorMessage((errorMessage) => {
        return {
          ...errorMessage,
          checkFirstName: true,
          errorFirstName: "Please enter your first name",
        };
      });
    } else {
      setErrorMessage((errorMessage) => {
        return {
          ...errorMessage,
          checkFirstName: false,
          errorFirstName: "",
        };
      });
    }

    //check Last Name
    if (!textInput.LastName.trim()) {
      setErrorMessage((errorMessage) => {
        return {
          ...errorMessage,
          checkLastName: true,
          errorLastName: "Please enter your last name",
        };
      });
    } else {
      setErrorMessage((errorMessage) => {
        return {
          ...errorMessage,
          checkLastName: false,
          errorLastName: "",
        };
      });
    }

    //check Email
    if (!textInput.Email.trim()) {
      setErrorMessage((errorMessage) => {
        return {
          ...errorMessage,
          checkEmail: true,
          errorEmail: "Please enter your email",
        };
      });
    } else if (!regex.test(textInput.Email.trim())) {
      setErrorMessage((errorMessage) => {
        return {
          ...errorMessage,
          checkEmail: true,
          errorEmail: "The Email Address invalid",
        };
      });
    } else {
      setErrorMessage((errorMessage) => {
        return {
          ...errorMessage,
          checkEmail: false,
          errorEmail: "",
        };
      });
    }

    //check Password
    if (!textInput.Password.trim()) {
      setErrorMessage((errorMessage) => {
        return {
          ...errorMessage,
          checkPassword: true,
          errorPassword: "Please enter your Password",
        };
      });
    } else {
      setErrorMessage((errorMessage) => {
        return {
          ...errorMessage,
          checkPassword: false,
          errorPassword: "",
        };
      });
    }

    //check RePassword
    if (!textInput.RePassword.trim()) {
      setErrorMessage((errorMessage) => {
        return {
          ...errorMessage,
          checkRePassword: true,
          errorRePassword: "Please re-enter the password again",
        };
      });
    } else if (textInput.Password.trim() !== textInput.RePassword.trim()) {
      setErrorMessage((errorMessage) => {
        return {
          ...errorMessage,
          checkRePassword: true,
          errorRePassword: "Re - Password does not match password",
        };
      });
    } else {
      setErrorMessage((errorMessage) => {
        return {
          ...errorMessage,
          checkRePassword: false,
          errorRePassword: "",
        };
      });
    }
  };
  const [success, setsuccess] = useState(false);
  const [timeSpan, setTimeSpan] = useState(false);
  const postRegister = (e) => {
    setTimeSpan(true);
    if (
      textInput.FirstName.trim() &&
      textInput.LastName.trim() &&
      textInput.Email.trim() &&
      textInput.Password.trim() &&
      textInput.RePassword.trim() &&
      textInput.Password.trim() === textInput.RePassword.trim()
    ) {
      axios
        .post(LocalhostApi + "user", {
          username: textInput.LastName,
          password: passwordHash.generate(textInput.Password),
          email: textInput.Email,
          role: 1,
          is_upgrade: false,
          avatar: uploadedImage.current.currentSrc,
          full_name: textInput.FirstName,
        })
        .then(
          (response) => {
            if (response.data.status === "success") {
              setsuccess(true);
            } else {
              setAnnouncement("Username or email already exists");
              setsuccess(false);
            }
            setTimeSpan(false);
            return;
          },
          (error) => {
            console.log(error);
          }
        );
    }
  };
  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div id="register">
      {success ? <SuccessRegister /> : null}
      <Form>
        <ImgBG src="https://images.squarespace-cdn.com/content/v1/5d1c1767f015080001773454/1563511715585-69TRKAE6UYQDC2T7NNOJ/Poster+spread+%28Custom%29.jpg" />
        <ImgBGu />
        <Card>
          <Introduce>
            <img
              className="chom-film"
              src="https://cdn2.expertreviews.co.uk/sites/expertreviews/files/styles/er_main_wide/public/2019/11/the-best-films-on-now-tv-with-sky-cinema.jpg"
            />
            <div className="img-gb"></div>
            <Title>????ng k?? ngay</Title>
            <img
              src={process.env.PUBLIC_URL + "/images/LOGOF.png"}
              className="Logo"
              alt="logo"
            />
            <span>????? c??ng tr???i nghi???m nh???ng b??? phim hay nh???t</span>
            <p>Ch???m Film, n??i c??ng b???n chia s??? phim</p>
          </Introduce>
          <Information>
            <Upload>
              <ImageTemp>
                <Image ref={uploadedImage} onChange={handleImageUpload} />
              </ImageTemp>
              <UpdateButton onClick={() => imageUploader.current.click()}>
                <ion-icon
                  style={{ position: "absolute", left: "5px" }}
                  name="cloud-upload"
                ></ion-icon>
                T???i ???nh l??n
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  required
                  onChange={handleImageUpload}
                  ref={imageUploader}
                  style={{ display: "none" }}
                />
              </UpdateButton>
            </Upload>
            <Announcement>{announcement}</Announcement>
            <TextField
              className="text-field-register"
              inputProps={{ style: { fontSize: 20, color: "white" } }}
              label="H??? v?? t??n*"
              variant="outlined"
              fullWidth
              error={errorMessage.checkFirstName}
              helperText={errorMessage.errorFirstName}
              onChange={(event) => {
                setTextInput((textInput) => {
                  return { ...textInput, FirstName: event.target.value };
                });
              }}
            />
            <TextField
              className="text-field-register"
              inputProps={{ style: { fontSize: 20, color: "white" } }}
              label="T??n ????ng nh???p*"
              variant="outlined"
              fullWidth
              error={errorMessage.checkLastName}
              helperText={errorMessage.errorLastName}
              onChange={(event) => {
                setTextInput((textInput) => {
                  return { ...textInput, LastName: event.target.value };
                });
              }}
            />
            <TextField
              className="text-field-register"
              inputProps={{ style: { fontSize: 20, color: "white" } }}
              autoComplete="chrome-off"
              label="Email*"
              variant="outlined"
              fullWidth
              error={errorMessage.checkEmail}
              helperText={errorMessage.errorEmail}
              onChange={(event) => {
                setTextInput((textInput) => {
                  return { ...textInput, Email: event.target.value };
                });
              }}
            />
            <TextField
              className="text-field-register"
              autoComplete="chrome-off"
              inputProps={{ style: { fontSize: 20, color: "white" } }}
              label="M???t kh???u*"
              type="password"
              variant="outlined"
              fullWidth
              error={errorMessage.checkPassword}
              helperText={errorMessage.errorPassword}
              onChange={(event) => {
                setTextInput((textInput) => {
                  return { ...textInput, Password: event.target.value };
                });
              }}
            />
            <TextField
              className="text-field-register"
              inputProps={{ style: { fontSize: 20, color: "white" } }}
              label="Nh???p l???i m???t kh???u*"
              type="password"
              variant="outlined"
              fullWidth
              error={errorMessage.checkRePassword}
              helperText={errorMessage.errorRePassword}
              onChange={(event) => {
                setTextInput((textInput) => {
                  return { ...textInput, RePassword: event.target.value };
                });
              }}
            />
            <RegisterButton
              onClickCapture={(e) => {
                checkTextInput(e);
                postRegister(e);
              }}
            >
              <span>
                {timeSpan && (
                  <i
                    className="fa fa-refresh fa-spin"
                    style={{ marginRight: "5px" }}
                  />
                )}
                ????ng k??
              </span>
            </RegisterButton>
          </Information>
        </Card>
      </Form>
    </div>
  );
};

export default SignUp;
