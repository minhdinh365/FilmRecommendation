import styled from "styled-components";

export const Form = styled.div`
  width: 100%;
  max-width: 1260px;
  margin: auto;
  display: flex;
  height: 95vh;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 200;
`;

export const Card = styled.div`
  width: 70%;
  border-radius: 25px;
  display: flex;
  background-color: rgba(255, 255, 255, 0.75);
`;

export const ImageTemp = styled.div`
  width: 235px;
  height: 235px;
  border-radius: 50%;
  background: url("https://lh3.googleusercontent.com/a/default-user=s96-c");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

export const Upload = styled.div`
  width: 50%;
  display: grid;
  grid-template-rows: 2fr 1fr;
  justify-content: center;
  align-items: center;
  padding: 10% 0;
`;

export const Image = styled.img`
  max-width: 235px;
  width: 100%;
  max-height: 235px;
  height: 100%;
  border-radius: 50%;
`;

export const UpdateButton = styled.button`
  border: 0;
  outline: 0;
  font-weight: 700;
  font-size: 18px;
  padding: 10px;
  border-radius: 5px;
  color: #fff;
  background: #333;
  transition: background 2s;
  :hover {
    background: linear-gradient(90deg, orange, blue);
    color: #fff;
  }
`;

export const Information = styled.div`
  padding: 20px;
  width: 50%;
  color: #333;
  justify-content: center;
  font-weight: 700;

  & .MuiFormControl-root {
    margin: 5% 0;
    display: block;
    width: auto;
  }
  & h1 {
    text-align: center;
  }
  & .MuiInputLabel-outlined {
    transform: translate(14px, 10px) scale(1);
    font-size: 14px;
  }
  & .MuiFormHelperText-root {
    font-size: 1rem;
  }
`;

export const Title = styled.h1``;

export const RegisterButton = styled.button`
  border: 0;
  outline: 0;
  display: flex;
  background-color: #333;
  color: #fff;
  font-weight: 700;
  font-size: 24px;
  align-items: center;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  justify-content: center;
  transition: background 2s;
  margin-bottom: 20px;
  :hover {
    background: linear-gradient(90deg, orange, blue);
    color: #fff;
  }
`;
