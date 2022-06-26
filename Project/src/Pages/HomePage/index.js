import React from "react";
import Header from "../../Components/Header/NavBar";
import Footer from "../../Components/Footer";
import Contact from "../../Components/Contact";
import FilmsNow from "../../Components/MovieNow";
import FilmsOnChart from "../../Components/MovieUpComing";
import About from "../../Components/About";
import RecommendUser from "../../Components/RecommendForUser";
import { useLocation } from "react-router";

function Index() {
  document.title = "Chom Film";

  return (
    <div className="Home">
      <Header isHome={true} />
      <FilmsOnChart />
      <RecommendUser />
      <FilmsNow />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}

export default Index;
