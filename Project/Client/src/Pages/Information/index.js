import React from "react";
import Header from "../../Components//Header/NavBar";
import Contact from "../../Components/Contact";
import Information from '../../Components/InforUser'



function Index(props) {
  return (
    <div className="informatiton">
      <Header />
      <Information/>
      <Contact />
    </div>
  );
}

export default Index;
