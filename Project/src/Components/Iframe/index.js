import React from "react";
import Iframe from "react-iframe";

export default function Index({ id }) {
  let URL = `https://www.2embed.ru/embed/tmdb/movie?id=${id}`;
  return (
    <div className="wrapper-iframe">
      <Iframe
        url={URL}
        id="iframe-video"
        className="iframe-video"
        display="flex"
        position="relative"
        allow="fullscreen"
      />
    </div>
  );
}
