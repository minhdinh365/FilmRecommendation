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
  z-index:21;

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
`

export const Container = styled.div`
  margin: 79px auto auto auto;
  width: 100%;
  max-width: 1260px;
  display: flex;
  justify-content: center;
`;

export const Card = styled.div`
  width: 90%;
  display: flex;
  background-image: linear-gradient(rgb(0,0,0), rgb(0,0,0,0.85), rgb(0,0,0));
  @media screen and (max-width: 1024px) {
      flex-direction: column;
      align-items: center;
      justify-content: center;
  }
`;

export const Poster = styled.img`
  width: 40%;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
  @media screen and (max-width: 1024px) {
    width: 60%;
}
`;

export const Detail = styled.div`
  padding: 40px;
  width: 60%;
  color: #fff;
  h2{
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
  animation-name: react-reveal-787989004656816-1;
  & .iconify {
    margin-right: 5px;
    color: red;
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
  grid-column: 1/ span 2;
  grid-row: 4/span 0;
  span{
    color: yellow;
    font-size: 16px;
  }
`;