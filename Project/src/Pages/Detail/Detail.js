import React, { useState, useEffect } from "react";
import DetailMovieCard from "../../Components/DetailMovieCard";
import CommentBox from "../../Components/EvaluateMovie";
import axios from "axios";

const Detail = () => {
  const [content, setContent] = useState([]);
  useEffect(() => {
    axios
      .get("http://192.168.1.3:3030/films?id=834068")
      .then(({ data }) => {
        setContent(data.films);
        console.log(data.films);
      })
      .catch((err) => {});

    return () => {};
  }, []);

  return (
    <>
      <DetailMovieCard contents={content} />
      <CommentBox />
    </>
  );
};

export default Detail;
