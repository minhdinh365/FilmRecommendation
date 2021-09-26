import React, { useState } from "react";
import axios from "axios";
import passwordHash from 'password-hash'
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
} from "./RegisterElement";
import { TextField } from "@material-ui/core";

const SignUp = () => {
  var regex = new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");

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

  const checkTextInput = () => {
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
  const postRegister = () => {
    if (
      textInput.FirstName.trim() &&
      textInput.LastName.trim() &&
      textInput.Email.trim() &&
      textInput.Password.trim() &&
      textInput.RePassword.trim() &&
      textInput.Password.trim() === textInput.RePassword.trim()
    ) {
      axios
        .post("http://192.168.1.3:3030/users", {
          username: textInput.LastName,
          password: passwordHash.generate(textInput.Password),
          email: textInput.Email,
          role: 1,
          avatar: uploadedImage.current.currentSrc,
          full_name: textInput.FirstName,
        })
        .then(
          (response) => {
            console.log("OK");
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
    <>
      <Form>
        <Card>
          <Upload>
            <ImageTemp>
              <Image ref={uploadedImage} onChange={handleImageUpload} />
            </ImageTemp>
            <UpdateButton onClick={() => imageUploader.current.click()}>
              <span>Upload File</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                ref={imageUploader}
                style={{ display: "none" }}
              />
            </UpdateButton>
          </Upload>
          <Information>
            <Title>Register</Title>
            <TextField
              label="Full Name"
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
              label="Username"
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
              label="Your Email"
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
              label="Password"
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
              label="Re - Password"
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
            <RegisterButton onClickCapture={(checkTextInput, postRegister)}>
              <span>Register</span>
            </RegisterButton>
          </Information>
        </Card>
      </Form>
    </>
  );
};

export default SignUp;
