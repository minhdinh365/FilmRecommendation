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
  }
`;

export const Background = styled.div`
background-position: center;
background-repeat: no-repeat;
background-size: cover;
`

export const Container = styled.div`
margin: 100px auto auto auto;
  width: 100%;
  max-width: 1260px;
  display: flex;
  justify-content: center;

`;

export const Card = styled.div`
  width: 90%;
  display: flex;
  background-color: rgba(0, 0, 0, 0.85);
`;

export const Poster = styled.img`
  width: 40%;
`;

export const Detail = styled.div`
  padding: 40px;
  width: 60%;
  color: #fff;
`;

export const Title = styled.h2`
  font-weight: 400;
  text-transform: uppercase;
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

  & .iconify {
    color: gray;
    margin-right: 5px;
  }
`;

export const TrailerButton = styled.button`
  border: 0;
  outline: 0;
  display: flex;
  background-color: transparent;
  color: #fff;
  font-weight: 700;
  font-size: 18px;
  align-items: center;
  padding: 5px;
  cursor: pointer;

  & .iconify {
    margin-right: 5px;
    color: red;
  }
`;

export const Slogan = styled.h2`
  font-weight: 500;
`;

export const Desc = styled.p`
  margin-top: 40px;
  line-height: 30px;
`;

export const Statistics = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  margin-top: 50px;

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
