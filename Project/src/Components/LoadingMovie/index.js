import React, { useState } from "react";
import FullLoadingPage from "./LoadingMovie";

const LoadingMovieLoad = () => {
  const [loading, setLoading] = useState(false);
  return [
    loading ? <FullLoadingPage></FullLoadingPage> : null,
    () => setLoading(true), // Show loading
    () => setLoading(false), //Close Loading
  ];
};
export default LoadingMovieLoad;
