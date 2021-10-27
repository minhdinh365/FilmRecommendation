import React, { Component } from "react";
import MovieCard from "./MoviesNowOnCard";
import Advertisments from '../Advertisments'

class MoviesNow extends Component {

  render() {
    return (
      <section id="portfolio">
        <Advertisments start={1530} end={4700} />
        <h1> Phim Hôm Nay</h1>
        <MovieCard />
      </section>
    );
  }
}
export default MoviesNow;
