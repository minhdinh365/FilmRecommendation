import React, { Component } from "react";
import Fade from "react-reveal";

class About extends Component {
  render() {
    return (
      <section id="about">
        <Fade duration={1000}>
          <div className="row">
            <div className="three columns">
              <img
                className="profile-pic"
                src={process.env.PUBLIC_URL + "/images/LOGOF.png"}
                alt="Nordic Giant Profile Pic"
                style={{ width: "320px", height: "320px" }}
              />
            </div>
            <div className="six columns main-col">
              <h2>Chom Films</h2>
              <p>Nơi bạn tìm thấy những bộ phim yêu thích của mình</p>
              <div className="row">
                <div className="columns contact-details">
                  <h2>Liên hệ với chúng tôi tại</h2>
                  <p className="address">
                    <span>Đồng chí: ThanBen</span>
                    <br />
                    <span>
                      Đ/c: 183/Nam Hoa
                      <br />
                      TPHCM Quận 9, Phước Long A
                    </span>
                    <br />
                    <span>SDT: 0345253023</span>
                    <br />
                    <span>Email: 18110254@student.hcmute.edu.vn</span>
                  </p>
                </div>
                <div className="columns download">
                  <p>
                    <a href="fb.com" className="button">
                      <i className="fa fa-facebook"></i>Like Me
                    </a>
                  </p>
                </div>
                <div className="columns download">
                  <p>
                    <a href="fb.com" className="button">
                      <i className="fa fa-instagram"></i>Like Me
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Fade>
      </section>
    );
  }
}

export default About;
