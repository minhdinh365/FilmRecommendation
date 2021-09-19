import React, { Component} from "react";
import MovieCard from './MoviesNowOnCard'

class MoviesNow extends Component {
  render() {
    return (  
      <section id="portfolio" style = {{backgroundColor : '#000000'}}>
        <h1 style ={{fontSize : 30}}> Phim Hôm Nay</h1>
          <div className = "Option" style = {{display : 'flex', justifyContent : 'center'}}>
          </div>     
           <MovieCard/>
      </section>       
    );
  }
}
export default MoviesNow;
