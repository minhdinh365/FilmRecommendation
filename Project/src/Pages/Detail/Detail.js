import React, { useState, useEffect } from "react";
import DetailMovieCard from "../../Components/DetailMovieCard";
import CommentBox from "../../Components/EvaluateMovie";
import axios from "axios";

const Detail = () => {
  const [content, setContent] = useState([]);
  useEffect(() => {
    axios
      .get("http://192.168.1.3:3030/comments?id=834068")
      .then(({ data }) => {
        setContent(data);
      })
      .catch((err) => {});
    return () => {};
  }, []);
  if (content.length) {
    return (
      <>
        <DetailMovieCard contents={content[0].film} />
        <CommentBox evaluate={content} information={content[0].info} />
      </>
    );
  } else {
    return (
      <>
        <DetailMovieCard contents={content} />
        <CommentBox />
      </>
    );
  }
};

export default Detail;
