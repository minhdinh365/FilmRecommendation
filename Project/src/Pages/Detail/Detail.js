import React, { useState, useEffect, Component } from "react";
import DetailMovieCard from "../../Components/DetailMovieCard";
import CommentBox from "../../Components/EvaluateMovie";
import { useRouteMatch } from "react-router-dom";
import Header from "../../Components//Header/NavBar";
import Footer from "../../Components/Footer";
import axios from "axios";
// import Recommandation from '../../Components/Recommandations'
import UseFullLoading from "../../Components/FullPageLoading";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

const Detail = () => {
  const cookieUser = Cookies.get("User");
  const [success, setSuccess] = useState("");
  const [loader, showLoader, hideLoader] = UseFullLoading();
  const {
    params: { id },
  } = useRouteMatch("/detail/:id");
  const [content, setContent] = useState([]);
  const [film, setFilm] = useState();
  const [User, setUser] = useState({
    username: "",
    avatar: "",
    full_name: "",
  });
  useEffect(() => {
    if (cookieUser) {
      setSuccess(jwt_decode(cookieUser).username);
    }
    showLoader();
    window.scrollTo(0, 0);
    const requestOne = axios.get(`http://localhost:5000/comment?id=${id}`);
    const requestTwo = axios.get(
      `http://localhost:5000/infor?username=${success}`
    );
    const requestThree = axios.get(`http://localhost:5000/film/${id}`);
    axios.all([requestOne, requestTwo, requestThree]).then(
      axios.spread((...responses) => {
        const res1 = responses[0];
        const res2 = responses[1];
        const res3 = responses[2];
        setContent(res1.data);
        if (res2.data.account != null) setUser(res2.data.account);
        setFilm(res3.data);
        hideLoader();
      })
    );
  }, [id, cookieUser]);

  if (film !== undefined)
    return (
      <>
        <Header />
        <DetailMovieCard contents={film} />
        <CommentBox evaluate={content} information={User} />
        <Footer />
      </>
    );
  else
    return (
      <>
        <Header />
      </>
    );
};
export default Detail;
