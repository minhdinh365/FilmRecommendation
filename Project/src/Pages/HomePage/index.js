import React from "react";
import Header from "../../Components//Header";
import Footer from "../../Components/Footer";
import Contact from "../../Components/Contact";
import FilmsNow from "../../Components/MovieNow";
import FilmsOnChart from "../../Components/MovieUpComing";
import About from "../../Components/About";
import RecommendUser from "../../Components/RecommendForUser";


function Index() {
  document.title = "Chom Film";

  return (
    <div className="Home">
      <Header />
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
