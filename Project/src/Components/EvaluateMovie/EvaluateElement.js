import styled from "styled-components";
export const Card = styled.div`
  width: 90%;
  display: block;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.85);
  & span {
    justify-content: center;
    align-items: center;
  }
  & div:nth-child(2) {
    justify-content: center;
    display: flex;
    align-items: center;
  }
`;

export const Frame = styled.div`
  background-color: rgba(0, 0, 0, 0.85);
  width: 90%;
  display: grid;
  grid-template-columns: 1fr 3fr 2fr 9fr;
  align-items: center;
  & label {
    text-align: center;
    grid-column: 1;
  }
  & input {
    position: fixed;
    z-index: 10000;
  }
`;

export const ReplyFrame = styled.div`
  background-color: rgba(0, 0, 0, 0.85);
  width: 90%;
  display: grid;
  grid-template-columns: 1fr 2fr 3fr 9fr;
  justify-content: center;
  align-items: center;
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
    text-align: left;
    font-weight: 400;
  }
`;

export const ReviewFrame = styled.div`
  width: 90%;
  max-width: 1260px;
  margin: auto;
  display: flex;
  justify-content: center;
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

export const Group = styled.div``;

export const GroupPost = styled.div`
  grid-column: 4;
  display: flex;
`;

export const Comment = styled.textarea`
  background: white;
  min-height: 40px;
  min-width: 100%;
  color: #333;
  font-size: 18px;
  padding : 10px 20px 0px;
  resize: vertical;
  outline: none;
`;

export const ReplyBox = styled.textarea`
  background: silver;
  border-radius: 10px;
  height: 32px;
  min-height: 32px;
  width: 70%;
  color: #333;
  font-size: 18px;
  text-align: center;
  resize: vertical;
  outline: none;
  grid-column: 4;
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
    background: silver;
    border-radius: 5px;
    color: #333;
  }
`;

export const Icon = styled.img`
  border-radius: 50%;
  justify-self: center;
  width: 50px;
  height: 50px;
`;