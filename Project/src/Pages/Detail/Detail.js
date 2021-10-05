import React, { useState, useEffect, Component } from "react";
import DetailMovieCard from "../../Components/DetailMovieCard";
import CommentBox from "../../Components/EvaluateMovie";
import { useRouteMatch } from 'react-router-dom';
import Header from "../../Components//Header/NavBar";
import Footer from "../../Components/Footer";
import axios from "axios";
import Recommandation from '../../Components/Recommandations'
import { URL_DETAIL, API_KEY } from "../../API/const";

const Detail = () => {
  const { params: { id },
  } = useRouteMatch('/detail/:id');  
  const [content, setContent] = useState([]);
  useEffect(() => {
    axios
      .get(`${URL_DETAIL}${id}${API_KEY}&language=vi-VN`)
      .then(({ data }) => {
        setContent(data);
      })
      .catch((err) => {});
    return () => {};
  }, []);
  if (content.length) {
    return (
      <>
        <Header/>
        <DetailMovieCard contents={content[0].film} />
        <Footer/>
      </>
    );
  } else {
    return (
      <>
        <Header/>
        <DetailMovieCard contents={content} />
        <Recommandation id = {parseInt(id)} />
        <Footer/>
      </>
    );
  }
};
export default Detail;

