import React from "react";

export default function FullLoadingPage() {
  return (
    <div>
      <div className="lp-container">
        <img
          src={`https://icon-library.com/images/loading-icon-animated-gif/loading-icon-animated-gif-7.jpg`}
          className="fp-loader"
          alt="Loading..."
        ></img>
      </div>
    </div>
  );
}
