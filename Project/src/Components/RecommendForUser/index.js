import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import Recommend from "./Recommend";
import { Provider } from "react-redux";
import store from "../../Redux/store";

export default function index() {
  const [success, setSuccess] = useState("");
  useEffect(() => {
    let isCancel = false;
    if (!isCancel) {
      setCookiesF();
    }
    return () => {
      isCancel = true;
    };
  }, [success]);
  async function setCookiesF() {
    const cookieUser = Cookies.get("User");
    if (cookieUser) {
      await setSuccess(jwt_decode(cookieUser).username);
    }
  }

  return (
    <Provider store={store}>
      {success !== "" ? (
        <section id="recommend-user">
          <h2>
            <strong>Gợi ý dành cho bạn</strong>
          </h2>
          <Recommend user={success}></Recommend>
        </section>
      ) : null}
    </Provider>
  );
}
