import {React, Component} from "react";
import {Container} from 'react-bootstrap'
import Slider from "react-slick";
import axios from 'axios';
import { URL_DETAIL, API_KEY } from '../../API/const';
import MovieBXH from './MovieOnCharts'

class BXH extends Component{
  constructor(props) {
    super(props);
    this.state = {
    results : [],
  };
  this.play = this.play.bind(this);

  }
  play() {
    this.slider.slickPlay();
  }
  componentDidMount() {
    axios.get(`${URL_DETAIL}popular${API_KEY}&language=en-US&page=1`)
    .then((response) => {
      this.setState({results : response.data.results});
      });
  }
  render(){
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
    };
    const Movies = this.state.results.slice(0,15).map(movie =>(
      <MovieBXH key = {movie.id} movie = {movie}></MovieBXH>
    ));
    return (
        <Container id = "bxhm" >         
          <div style = {{justifyContent : 'space-between', display:'flex'}}>
            <h2 style ={{marginLeft: '18px'}}>Đang Công Chiếu</h2>
          </div>
          <Slider ref={slider => (this.slider = slider)} {...settings}>
            {Movies}
          </Slider>
        </Container>
    )
  }
}

export default BXH;