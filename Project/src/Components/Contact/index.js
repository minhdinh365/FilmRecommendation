import React, { Component } from "react";

class Contact extends Component {
  render() {
    return (
      <section id="contact">
        <div className="contact-movie">
          <div className="col-contact-movie">
            <h4>Chăm sóc khách hàng</h4>
            <ul className="serviceCustomer">
              <li>Trung tâm giúp đỡ</li>
              <li>Chính sách bản quyền</li>
              <li>Hướng dẫn xem phim</li>
            </ul>
          </div>
          <div className="col-contact-movie">
            <h4>Về Film Recommandation</h4>
            <ul className="serviceCustomer">
              <li>Chính sách bảo mật</li>
              <li>Giới thiệu về điều khoản</li>
              <li>Liên hệ truyền thông</li>
            </ul>
          </div>
          <div className="col-contact-movie">
            <h4>Liên hệ</h4>
            <ul className="serviceCustomer">
              <li>Facebook</li>
              <li>Gmail</li>
              <li>Zalo</li>
            </ul>
          </div>
        </div>
      </section>
    );
  }
}

export default Contact;
