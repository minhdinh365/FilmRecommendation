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
    margin-top: 30px;
    color: #fff;
    font-weight: 400;
    padding: 0 20px;
  }
  & h4 {
    margin-top: 30px;
    color: #fff;
    font-weight: 400;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
  }
`;

export const Group = styled.div``;

export const Comment = styled.textarea`
  background: silver;
  border-radius: 10px;
  font-size: 18px;
  text-align: center;
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
  margin-top: 30px;
  border-radius: 50%;
  max-width: 50px;
`;
