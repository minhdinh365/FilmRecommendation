import React, { Component } from "react";
import MovieCard from "./MoviesNowOnCard";

class MoviesNow extends Component {
  render() {
    return (
      <section id="portfolio">
        <h1> Phim Hôm Nay</h1>
        <MovieCard />
      </section>
    );
  }
}
export default MoviesNow;
