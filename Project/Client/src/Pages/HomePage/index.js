import React from "react";
import Header from "../../Components//Header";
import Footer from "../../Components/Footer";
import Contact from "../../Components/Contact";
import FilmsNow from "../../Components/MovieNow";
import FilmsOnChart from "../../Components/MovieChart";
import About from "../../Components/About";
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';
function Index() {
  return (
    <div className="Home">
      <Header />
      <FilmsOnChart /> 
      <FilmsNow /> 
      <About />
      <Contact />
      <Footer /> 
    </div>
  );
}

export default Index;
