import React, { useState, useEffect } from "react";
import DetailMovieCard from "../../Components/DetailMovieCard";
import CommentBox from "../../Components/EvaluateMovie";
import { useRouteMatch } from "react-router-dom";
import Header from "../../Components//Header/NavBar";
import Footer from "../../Components/Contact";
import axios from "axios";

const Detail = () => {
  const {
    params: { id },
  } = useRouteMatch("/detail/:id");
  const [content, setContent] = useState([]);
  useEffect(() => {
    axios
      .get(`http://192.168.1.3:3030/comments?id=595743`)
      .then(({ data }) => {
        setContent(data);
      })
      .catch((err) => {});
    return () => {};
  });
  if (content.length)
    return (
      <>
        <Header />
        <DetailMovieCard contents={content[0].film} />
        <CommentBox evaluate={content} information={content[0].info} />
        <Footer />
      </>
    );
  else
    return (
      <>
        <Header />
        <DetailMovieCard contents={content} />
        <CommentBox />
        <Footer />
      </>
    );
};

export default Detail;
