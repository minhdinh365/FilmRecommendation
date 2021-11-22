import styled from "styled-components";
export const CommentDetail = styled.div`
  p {
    position: relative;
    margin: 20px auto;
    text-align: center;
    font-size: 20px;
    background: gray;
    width: 13%;
    border-radius: 5px;
    background-image: linear-gradient(182deg, #000000 0%, #474242 74%);
    padding: 5px;
    cursor: pointer;
    user-select: none;
    @media screen and (max-width: 1024px) {
      width: 30%;
    }
    @media screen and (max-width: 475px) {
      width: 50%;
    }
  }
  p:hover {
    background-image: linear-gradient(182deg, #000000 0%, #474242 50%);
  }
  .iconload-more {
    margin-left: -29px;
    position: absolute;
    margin-top: 3px;
  }
`;
export const Card = styled.div`
  width: 90%;
  display: block;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.85);
  background: black;
  h2 {
    font: 28px "opensans-semibold", sans-serif;
    margin-bottom: 30px;
    position: relative;
    margin: 10px 0px;
    padding: 0;
    text-align: left;
    background-color: rgba(0, 0, 0, 0.85);
  }
  span {
    justify-content: center;
    align-items: center;
    font-size: 23px;
    position: relat;
  }
  & div:nth-child(2) {
    justify-content: center;
    display: flex;
    align-items: center;
  }
  h2 strong {
    padding: 0;
    z-index: 1;
    background: black;
    padding: 4px 8px;
    position: relative;
  }
  h2::after {
    position: absolute;
    content: "";
    z-index: 0;
    bottom: 50%;
    margin-bottom: -2px;
    height: 3px;
    left: 0;
    right: 0;
  }
`;

export const Frame = styled.div`
  background-color: rgba(0, 0, 0, 0.85);
  background: #232b2b;
  width: 90%;
  display: grid;
  grid-template-columns: 1fr 2fr 2fr 9fr;
  align-items: center;
  padding: 5px;

  @media screen and (max-width: 1024px) {
    grid-template-columns: 1fr 18fr 10fr 22fr;
  }
  @media screen and (max-width: 475px) {
    grid-template-columns: 1fr 9fr 8fr 8fr;
  }

  & label {
    background-color: yellow;
    border-radius: 8px;
    color: #000;
    cursor: pointer;
    font-weight: bold;
    text-align: center;
    transition: 200ms;
    width: 100%;
    box-sizing: border-box;
    border: 0;
    font-size: 14px;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
  }

  & label:not(:disabled):hover,
  & label:not(:disabled):focus {
    outline: 0;
    background: #f4e603;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.2), 0 3px 8px 0 rgba(0, 0, 0, 0.15);
  }

  & label:disabled {
    filter: saturate(0.2) opacity(0.5);
    cursor: not-allowed;
  }

  & label:hover {
    cusor: pointer;
    top: -2px;
    background: #46e1ff;
    justify-content: center;
  }
  & input {
    position: fixed;
    z-index: 10000;
    display: none;
  }
  & h5 {
    grid-column: 2;
    margin: 0;
  }
  & span {
    grid-row: 1/3;
    grid-column: 3;
    justify-content: center;
  }
  & h4 {
    grid-row: 1;
    grid-column: 4;
  }
`;

export const ReplyFrame = styled.div`
  background-color: rgba(0, 0, 0, 0.85);
  background: #353839;
  width: 90%;
  display: grid;
  grid-template-columns: 1fr 2fr 3fr 9fr;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 1024px) {
    grid-template-columns: 0.5fr 2fr 3fr 4fr;
  }
  & img {
    justify-self: center;
    grid-column: 2;
  }
  & h3 {
    grid-column: 3;
    font-weight: 600;
    text-align: left;
  }
  & h4 {
    grid-column: 4;
    grid-row: 1;
  }
  & h5 {
    padding: 0;
    grid-column: 3;
    margin: 0;
  }
  .line-comment {
    left: 50%;
    border-left: 2px solid green;
    height: 28px;
    border-bottom: 2px solid green;
    width: 100%;
    margin-left: 50%;
  }
`;

export const EvaluateFrame = styled.div`
  width: 100%;
  max-width: 1260px;
  margin: auto;
  display: flex;
  text-align: center;
  justify-content: center;
  & h2 {
    color: #fff;
    font-weight: 400;
  }
  & h3 {
    font-size: 16px;
    color: #00fc87;
    font-weight: 600;
  }
  & h4 {
    font-size: 16px;
    color: #fff;
    text-align: left;
    font-weight: 400;
  }
`;

export const ReviewFrame = styled.div`
  width: 100%;
  max-width: 1260px;
  display: flex;
  justify-content: center;
  margin: auto;
  & h2 {
    margin-top: 30px;
    color: #fff;
    font-weight: 400;
    text-transform: uppercase;
  }
  & h3 {
    font-size: 16px;
    color: #00fc87;
    font-weight: 600;
  }
  & h4 {
    font-size: 16px;
    color: #fff;
    font-weight: 400;
  }
`;

export const Group = styled.div`
  display: flex;
`;

export const GroupPost = styled.div`
  grid-column: 4;
  display: flex;
  button {
    border-bottom: 1px solid;
  }
`;

export const Comment = styled.textarea`
  background: white;
  min-height: 40px;
  min-width: 95%;
  color: #333;
  font-size: 18px;
  padding: 10px 20px 0px;
  resize: vertical;
  outline: none;
  @media screen and (max-width: 1024px) {
    min-width: 90%;
  }
  @media screen and (max-width: 472px) {
    min-width: 85%;
  }
  @media screen and (max-width: 300px) {
    min-width: 83%;
  }
`;

export const ReplyBox = styled.textarea`
  background: white;
  height: 32px;
  min-height: 32px;
  width: 100%;
  color: #333;
  font-size: 18px;
  text-align: left;
  padding-left: 5px;
  resize: vertical;
  outline: none;
  grid-column: 4;
  font-family: "opensans-regular", sans-serif;
`;

export const Send = styled.button`
  margin: auto;
  width: auto;
  text-decoration: none;
  font-weight: bolder;
  border: 0;
  outline: 0;
  color: #333;
  background: none;
  justify-content: center;
  border-radius: 5px;
  cursor: pointer;
  & .iconify {
    margin-right: 5px;
    height: 40px;
    width: 40px;
    background: white;
    border-radius: 5px;
    color: #333;
  }
`;

export const ButtonReply = styled.button`
  margin: auto;
  width: auto;
  text-decoration: none;
  font-weight: bolder;
  border: 0;
  outline: 0;
  color: #333;
  background: none;
  justify-content: center;
  border-radius: 5px;
  cursor: pointer;
  & .iconify {
    margin-right: 5px;
    height: 32px;
    width: 42px;
    background: white;
    border-radius: 5px;
    color: #333;
  }
`;

export const Icon = styled.img`
  border-radius: 50%;
  justify-self: center;
  width: 50px;
  height: 50px;
  grid-row: 1/3;
  object-fit: cover;
`;
