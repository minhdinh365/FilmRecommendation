import React, { Component } from "react";
import MovieCard from "./MoviesNowOnCard";
import Category from '../Category'
import Advertisments from '../Advertisments'

class MoviesNow extends Component {

  render() {
    return (
      <section id="portfolio">
        <Advertisments start = {1680} end ={4700} />
        <hr/>
        <h1> Phim Hôm Nay</h1>
        <Category/>
        <MovieCard />
      </section>
    );
  }
}
export default MoviesNow;