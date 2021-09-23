import styled from "styled-components";
export const Card = styled.div`
  width: 90%;
  display: flex;
  background-color: rgba(0, 0, 0, 0.85);

  & span {
    justify-content: center;
    align-items: center;
  }
`;

export const Frame = styled.div`
  background-color: rgba(0, 0, 0, 0.85);
  width: 90%;
  display: grid;
  grid-template-columns: 1fr 3fr 2fr 9fr;
  justify-content: start;
  align-items: center;
`;

export const EvaluateFrame = styled.div`
  width: 100%;
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
    color: #fff;
    font-weight: 400;
    padding: 0 20px;
  }
  & h4 {
    font-size: 16px;
    color: #fff;
    font-weight: 400;
    padding: 0 20px;
  }
`;

export const Group = styled.div``;

export const Comment = styled.textarea`
  background: silver;
  border-radius: 10px;
  min-height: 32px;
  max-width: 100%;
  min-width: 50%;
  width: 70%;
  color: #333;
  font-size: 18px;
  text-align: center;
  resize: vertical;
  outline: none;
`;

export const Send = styled.button`
  padding: 3px;
  text-decoration: none;
  font-weight: bolder;
  border: 0;
  outline: 0;
  color: #333;
  background-color: white;
  border-radius: 5px;
  cursor: pointer;
`;

export const Icon = styled.img`
  margin-left: 20px;
  border-radius: 50%;
  width: 50px;
  height: 50px;
`;
