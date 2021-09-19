import React from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer/Footer";
import Contact from "../../Components/Contact/Contact";
import FilmsNow from "../../Components/MovieNow";
import BXH from "../../Components/MovieChart";
import About from "../../Components/About";

function Index() {
  return (
    <div className="Home">
      <Header />
      <BXH />
      <FilmsNow />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}

export default Index;
