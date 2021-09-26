import React, { useState, useEffect } from "react";
import DetailMovieCard from "../../Components/DetailMovieCard";
import CommentBox from "../../Components/EvaluateMovie";
import { useRouteMatch } from 'react-router-dom';
import Header from "../../Components//Header/NavBar";
import Footer from "../../Components/Contact";
import axios from "axios";

const Detail = () => {
  const { params: { id },
  } = useRouteMatch('/detail/:id');  
  const [content, setContent] = useState([]);
  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${id}?api_key=a2df3d1a7611194432bbdf1fc80540f2&language=en-US`)
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
        {/* <CommentBox evaluate={content} information={content[0].info} /> */}
        <Footer/>
      </>
    );
  } else {
    return (
      <>
        <Header/>
        <DetailMovieCard contents={content} />
        {/* <CommentBox /> */}
        <Footer/>
      </>
    );
  }
};

export default Detail;
