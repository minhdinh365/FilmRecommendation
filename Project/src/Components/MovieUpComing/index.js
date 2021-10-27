import { React, Component } from "react";
import { Container } from "react-bootstrap";
import Slider from "react-slick";
import axios from "axios";
import MovieBXH from "./MovieOnCharts";

class BXH extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
    };
    this.play = this.play.bind(this);
  }
  play() {
    this.slider.slickPlay();
  }
  componentDidMount() {
    axios.get(`http://localhost:5000/films/upcoming?page=1`)
      .then((response) => {
        this.setState({ results: response.data.results });
      })
      .catch((err) => {
        alert('Kiểm tra kết nối của bạn')
      })
  }
  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
    const Movies = this.state.results
      .slice(0, 15)
      .map((movie) => <MovieBXH key={movie.id} movie={movie}></MovieBXH>);
    return (
      <Container id="bxhm">
        <h2><strong>Công chiếu<span>( {this.state.results.length} )</span></strong></h2>
        <Slider ref={(slider) => (this.slider = slider)} {...settings}>
          {Movies}
        </Slider>
      </Container>
    );
  }
}

export default BXH;
