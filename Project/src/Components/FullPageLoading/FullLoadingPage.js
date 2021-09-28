import React from "react";

export default function FullLoadingPage() {
  return (
    <div >
      <div className="lp-container">
        <img
           src={process.env.PUBLIC_URL + "/images/loading.gif"}
          className="fp-loader"
          alt="Loading..."

        ></img>
      </div>
    </div>
  );
}
