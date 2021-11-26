import { style } from "@mui/system";
import styled from "styled-components";

export const PlayYoutube = styled.div`
  background-image: linear-gradient(
    rgba(0, 0, 0, 0.85) 15%,
    rgba(0, 0, 0, 0.2) 40%,
    rgba(0, 0, 0, 1) 100%
  );
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  z-index: 21;

  & .modal-video {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
  }

  & .modal-video-inner {
    width: 100% !important;
  }

  & .modal-video-movie-wrap {
    padding: 0 !important;
  }

  & .modal-video-movie-wrap iframe {
    width: 1180px;
    height: 640px;
    @media screen and (max-width: 1024px) {
      width: 1024px;
      height: 560px;
    }
    @media screen and (max-width: 768px) {
      width: 768px;
      height: 360px;
    }
    @media screen and (max-width: 375px) {
      width: 375px;
      height: 180px;
    }
    @media screen and (max-width: 1024px) {
      width: 1000px;
      height: 560px;
    }
  }
`;

export const Background = styled.div`
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const Container = styled.div`
  margin: 79px auto auto auto;
  width: 100%;
  max-width: 1260px;
  display: block;
  justify-content: center;
`;

export const Card = styled.div`
  width: 90%;
  display: flex;
  margin: auto;
  background-image: linear-gradient(
    rgb(0, 0, 0),
    rgb(0, 0, 0, 0.85),
    rgb(0, 0, 0)
  );
  @media screen and (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export const Poster = styled.img`
  width: 40%;
  max-height: 850px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
    rgba(0, 0, 0, 0.22) 0px 15px 12px;
    animation:move 1s ease-in-out;
  @media screen and (max-width: 1024px) {
    width: 60%;
  }
  @keyframes move{
    0%{
     transform: scale(0.5) rotate(8deg);
    }
      100%{
        transform: scale(1) rotate(0deg);
     
       }
    
    }
  animation: move 1s ease-in-out;
  @media screen and (max-width: 1024px) {
    width: 60%;
  }
  @keyframes move {
    0% {
      transform: scale(0.5) rotate(8deg);
    }
    100% {
      transform: scale(1) rotate(0deg);
    }
  }
`;

export const Detail = styled.div`
  padding: 40px 40px 0 40px ;
  width: 60%;
  color: #fff;
  h2 {
    text-align: center;
  }
  @media screen and (max-width: 1024px) {
    padding: 0px;
    justify-content: center;
    text-align: center;
  }
`;

export const Title = styled.h2`
  font-weight: 400;
  text-transform: uppercase;
  animation-fill-mode: both;
  animation-duration: 1000ms;
  animation-delay: 0ms;
  animation-iteration-count: 1;
  opacity: 1;
  animation-name: react-reveal-787989004656816-1;
`;

export const Controller = styled.div`
  display: flex;
  margin: 40px 0 40px 20px;
  justify-content: center;
  @media screen and (max-width: 767px) {
    flex-direction: column;
    margin: 0px;
    padding: 0px;
  }
`;

export const Rate = styled.div`
  width: 80px;
  text-align: center;
  display: flex;
  align-items: center;
  font-weight: 700;
  animation-fill-mode: both;
  animation-duration: 1000ms;
  animation-delay: 0ms;
  animation-iteration-count: 1;
  opacity: 1;
  animation-name: react-reveal-787989004656816-1;
  & .iconify {
    color: yellow;
    margin-right: 5px;
  }
`;

export const Like = styled.div`
  width: 80px;
  font-weight: 700;
  text-align: center;
  display: flex;
  align-items: center;
  animation-fill-mode: both;
  animation-duration: 1000ms;
  animation-delay: 0ms;
  animation-iteration-count: 1;
  opacity: 1;
  animation-name: react-reveal-787989004656816-1;
  & .iconify {
    color: gray;
    margin-right: 5px;
  }
`;
export const WrapperButton = styled.div`
  display: flex;
  @media screen and (max-width: 767px) {
    justify-content: center;
  }
`;
export const WrapperThum = styled.div`
  display: flex;
  @media screen and (max-width: 767px) {
    justify-content: center;
  }
`;
export const TrailerButton = styled.button`
  border: 3px solid;
  border-radius: 16px;
  padding: 5px 15px;
  display: flex;
  background-color: transparent;
  color: #fff;
  font-weight: 700;
  font-size: 18px;
  align-items: center;
  cursor: pointer;
  animation-fill-mode: both;
  animation-duration: 1000ms;
  animation-delay: 0ms;
  animation-iteration-count: 1;
  opacity: 1;
  margin-left: 5px;
  animation-name: react-reveal-787989004656816-1;
  & .iconify {
    margin-right: 5px;
    color: red;
  }
  a {
    text-decoration: none;
    color: yellow;
  }
`;

export const Slogan = styled.h2`
  font-weight: 500;
  animation-fill-mode: both;
  animation-duration: 1000ms;
  animation-delay: 0ms;
  animation-iteration-count: 1;
  opacity: 1;
  animation-name: react-reveal-787989004656816-1;
`;

export const Desc = styled.p`
  margin-top: 40px;
  line-height: 30px;
  animation-fill-mode: both;
  animation-duration: 1000ms;
  animation-delay: 0ms;
  animation-iteration-count: 1;
  opacity: 1;
  animation-name: react-reveal-787989004656816-1;
`;

export const Statistics = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  margin-top: 50px;
  animation-fill-mode: both;
  animation-duration: 1000ms;
  animation-delay: 0ms;
  animation-iteration-count: 1;
  opacity: 1;
  animation-name: react-reveal-787989004656816-1;
  & div > div:nth-child(2) {
    color: #00fc87;
    line-height: 30px;
    font-size: 20px;
  }

  & > div:nth-child(3),
  & > div:nth-child(4) {
    margin-top: 15px;
  }
`;

export const ReleaseDate = styled.div``;

export const RunningTime = styled.div``;

export const Budget = styled.div``;

export const Revenue = styled.div``;

export const Gener = styled.div`
  margin-top: 20px;
  grid-column: 1 / span 2;
  grid-row: 4 / span 0;
  span {
    color: yellow;
    font-size: 16px;
  }
`;

export const Keywords = styled.div`
  margin-top: 20px;
  grid-column: 1 / span 2;
  margin: auto;
  bottom: 0;
  display: flex;
  flex-wrap: wrap;
  span {
    margin-left: 10px;
    margin-bottom: 12px;
    color: #686363;
    font-size: 16px;
    background-color: #131212;
    border-radius: 5px;
    padding : 5px;
  }
`;
export const Caster = styled.div`
  background-image: linear-gradient(
    rgb(0, 0, 0),
    rgb(0, 0, 0, 0.85),
    rgb(0, 0, 0)
  );
  width: 90%;
  max-width: 1260px;
  height: auto;
  margin: auto;
  display: block;
  padding-top: 30px;
  h2 {
    margin: 0px 20px 20px 20px;
    color: yellow;
  }
`;
export const WrapperCaster = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 20px;
  margin: auto;
  justify-content: center;
`;
export const CasterCard = styled.div`
  width: 12%;
  display: block;
  box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
  margin: 0px 2.2%;
  border-radius: 5px;
  @media screen and (max-width: 1024px) {
    width: 23%;
  }
  @media screen and (max-width: 768px) {
    width: 45%;
    padding: 0px;
  }
  @media screen and (max-width: 375px) {
    width: 59%;
  }
  img {
    width: 100%;
    height: auto;
    border-radius: 5px;
    min-height: 204px;
  }
  h4 {
    text-align: center;
    font-weight: 300;
    color: white;
    margin: 0px 0px 12px 0px;
  }
  h3 {
    color: yellow;
    font-weight: 200;
  }
`;
