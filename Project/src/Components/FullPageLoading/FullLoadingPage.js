import React from "react";
import styled from 'styled-components'

const FullLoad = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    z-index: 100;
`
const IMG = styled.img`
  margin: 0;
  padding: 0;
`

export default function FullLoadingPage() {
  return (
    <div >
      <FullLoad>
        <IMG
           src={process.env.PUBLIC_URL + "/images/loading.gif"}
          className="fp-loader"
          alt="Loading..."

        ></IMG>
      </FullLoad>
    </div>
  );
}
