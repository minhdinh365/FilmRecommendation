import React from "react";
import styled from 'styled-components'

const FullLoad = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.95);
    display: flex;
    justify-content: center;
    z-index: 100;
`
const IMG = styled.img`
  margin: 0;
  padding: 0;
  top: 10%;
`

export default function LoadingMovie() {
  return (
    <FullLoad>
      <IMG
        src={process.env.PUBLIC_URL + "/images/loadingMovie.gif"}
        className="fp-loader"
        alt="Loading..."

      ></IMG>
    </FullLoad>
  );
}
