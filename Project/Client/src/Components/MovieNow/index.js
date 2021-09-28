import React, { Component } from "react";
import MovieCard from "./MoviesNowOnCard";
import Category from '../Category'

class MoviesNow extends Component {
  render() {
    return (
      <section id="portfolio">
        <hr/>
        <h1> Phim Hôm Nay</h1>
        <Category/>
        <MovieCard />
      </section>
    );
  }
}
export default MoviesNow;
