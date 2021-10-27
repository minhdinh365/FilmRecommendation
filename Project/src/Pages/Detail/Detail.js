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
  const { params: { id }, } = useRouteMatch("/detail/:id");
  const [loader, showLoader, hideLoader] = UseFullLoading();
  const [content, setContent] = useState([]);
  const [film, setFilm] = useState();
  const [total, setTotal] = useState(0)
  const [User, setUser] = useState({
    username: "",
    avatar: "",
    full_name: "",
  });
  useEffect(() => {
    let isCancel = false;
    if (!isCancel) {
      showLoader();
      let success = ''
      if (cookieUser !== undefined) {
        success = jwt_decode(cookieUser).username
      }
      window.scrollTo(0, 0);
      const requestOne = axios.get(`http://localhost:5000/comment?id=${id}`);
      const requestTwo = axios.get(`http://localhost:5000/infor?username=${success}`);
      const requestThree = axios.get(`http://localhost:5000/film/${id}`);
      CallApi(requestOne, requestTwo, requestThree)
    }
    return () => {
      isCancel = true;
      setFilm(null)
    }
  }, []);
  function CallApi(req1, req2, req3) {
    axios.all([req1, req2, req3]).then(
      axios.spread((...responses) => {
        const res1 = responses[0];
        const res2 = responses[1];
        const res3 = responses[2];
        setContent(res1.data.comments);
        setTotal(res1.data.total_comments)
        if (res2.data.account !== undefined) setUser(res2.data.account);
        setFilm(res3.data);
        hideLoader();
      })
    );
  }
  if (film !== undefined)
    return (
      <>
        {loader}
        <Header />
        <DetailMovieCard contents={film} />
        <CommentBox evaluate={content} information={User} id={id} total_comment={total} />
        <Footer />
      </>
    );
  else
    return (
      <>
        {loader}
        <Header />
      </>
    );
};
export default Detail;