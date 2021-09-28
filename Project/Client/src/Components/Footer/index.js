import React, { Component } from "react";
import Fade from "react-reveal";
import { Row } from "react-bootstrap";

class Footer extends Component {
  render() {
    return (
      <footer>
        <Row>
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
          <div id="go-top">
            <a className="smoothscroll" title="Back to Top" href="#home">
              <i className="fas fa-chevron-up"></i>
            </a>
          </div>
        </Row>
      </footer>
    );
  }
}

export default Footer;
