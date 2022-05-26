import React, { useState, useEffect, Component } from "react";
import DetailMovieCard from "../../Components/DetailMovieCard";
import CommentBox from "../../Components/EvaluateMovie";
import { useRouteMatch } from "react-router-dom";
import Header from "../../Components/Header/NavBar";
import Footer from "../../Components/Footer";
import axios from "axios";
import { LocalhostApi } from "../../API/const";
import Recommendation from "../../Components/Recommendations";
import UseFullLoading from "../../Components/FullPageLoading";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { URL_DETAIL, API_KEY } from "../../API/const";

const Detail = () => {
  const cookieUser = Cookies.get("User");
  const {
    params: { id },
  } = useRouteMatch("/detail/:id");
  const [loader, showLoader, hideLoader] = UseFullLoading();
  const [content, setContent] = useState([]);
  const [film, setFilm] = useState();
  const [total, setTotal] = useState(0);
  const [User, setUser] = useState();
  const [watchedFilm, setWatchedFilm] = useState({
    id: parseInt(id),
    watched: true,
  });
  useEffect(() => {
    let isCancel = false;
    if (!isCancel) {
      showLoader();
      let success = "";
      if (cookieUser !== undefined) {
        success = jwt_decode(cookieUser).username;
        let user = { username: success };
        let postWatch = { ...watchedFilm, ...user };
        axios.post(LocalhostApi + "watched", postWatch).then((data) => { });
      }
      window.scrollTo(0, 0);
      const requestOne = axios.get(LocalhostApi + `comment?id=${id}`);
      const requestTwo = axios.get(LocalhostApi + `infor?username=${success}`).catch((error=>{}));
      const requestThree = axios.get(LocalhostApi + `film/${id}`);
      CallApi(requestOne, requestTwo, requestThree);
    }
    return () => {
      isCancel = true;
      setFilm(null);
    };
  }, [id]);
  function CallApi(req1, req2, req3) {
    axios.all([req1, req2, req3]).then(
      axios.spread((...responses) => {
        const res1 = responses[0];
        const res2 = responses[1];
        const res3 = responses[2];
        setContent(res1.data.comments);
        setTotal(res1.data.total_comments);
        if (res2?.status !== 401 && res2?.data?.account !== undefined) 
        {
          setUser(res2.data.account);
        }
        setFilm(res3.data);
        hideLoader();
      })
    );
  }
  const [castMovie, setCastMovie] = useState([]);
  useEffect(() => {
    let isAcctive = false;
    async function fetchPostMovie() {
      try {
        axios
          .get(`${URL_DETAIL}${id}/credits${API_KEY}&language=vi`)
          .then((res) => {
            setCastMovie(res.data.cast);
          });
      } catch (e) { }
    }
    if (!isAcctive) {
      fetchPostMovie();
    }
    return () => {
      isAcctive = true;
    };
  }, [id]);
  if (film !== undefined)
    return (
      <div className="detail_page">
        {loader}
        <Header />
        {film && <DetailMovieCard contents={film} castMovie={castMovie} information={User} />}
        <CommentBox
          evaluate={content}
          information={User}
          id={id}
          total_comment={total}
        />
        <span>PHIM LIÊN QUAN</span>
        <Recommendation id={parseInt(id)}></Recommendation>
        <Footer />
      </div>
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
