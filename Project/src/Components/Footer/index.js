import React, { Component } from "react";
import Fade from "react-reveal";
import { Row } from "react-bootstrap";
import { animateScroll as scroll } from "react-scroll";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }
  showButtonOntop = (event) => {
    if (window.scrollY >= 1200) {
      this.setState({ active: true });
    } else this.setState({ active: false });
  };
  componentDidMount() {
    window.addEventListener("scroll", this.showButtonOntop);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.showButtonOntop);
  }
  render() {
    return (
      <footer>
        <Row>
          {this.state.active ? (
            <div className="arrow-button" onClick={() => scroll.scrollToTop()}>
              <ion-icon name="arrow-up-outline"></ion-icon>Top
            </div>
          ) : null}
          <Fade bottom>
            <div className="twelve columns">
              <ul className="social-links"></ul>
              <ul className="copyright">
                <li>
                  &copy; Film Recommandation nơi cùng bạn chia sẽ các bộ phim{" "}
                </li>
                <li>
                  Design by
                  <a
                    title="Styleshout"
                    href="https://www.facebook.com/ThanhBen.197"
                  >
                    Thanh Bằng
                  </a>
                </li>
              </ul>
            </div>
          </Fade>
        </Row>
      </footer>
    );
  }
}

export default Footer;
