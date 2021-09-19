import React, { Component } from "react";
import { Container, Col, Row } from "react-bootstrap";

class Contact extends Component {
  render() {
    return (
      <section id="contact">
        <Container>
          <Row style={{ display: "flex", justifyContent: "center" }}>
            <Col style={{ margin: "0 100px" }}>
              <h4>Chăm sóc khách hàng</h4>
              <ul className="serviceCustomer">
                <li>Trung tâm giúp đỡ</li>
                <li>Chính sách bản quyền</li>
                <li>Hướng dẫn xem phim</li>
              </ul>
            </Col>
            <Col style={{ margin: "0 100px" }}>
              <h4>Về Film Recommandation</h4>
              <ul className="serviceCustomer">
                <li>Chính sách bảo mật</li>
                <li>Giới thiệu về điều khoản</li>
                <li>Liên hệ truyền thông</li>
              </ul>
            </Col>
            <Col style={{ margin: "0 100px" }}>
              <h4>Liên hệ</h4>
              <ul className="serviceCustomer">
                <li>Facebook</li>
                <li>Gmail</li>
                <li>Zalo</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}

export default Contact;
