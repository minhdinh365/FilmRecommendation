import styled from "styled-components";

export const Form = styled.div`
  width: 100%;
  margin: auto;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 5;
  margin-bottom: 30px;
`;

export const Card = styled.div`
  margin-top: 70px;
  width: 70%;
  border-radius: 7px;
  display: flex;
  background-color: rgba(19, 35, 47, 0.9);
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
export const ButtonHome = styled.a`
  position: absolute;
  top: 0;
  left: 0;
  margin: 20px;
  color: white;
  solid yellow;
  padding : 5px;
  font-size: 18px;
  cursor: pointer;
  border-radius: 5px;
  background-color: black;\
  text-decoration: none;
  &:hover{
    color: yellow;
  }
`;

export const Upload = styled.div`
  width: 50%;
  display: grid;
  grid-template-rows: 2fr 1fr;
  justify-content: center;
  align-items: center;
  padding: 10% 0;
  position: relative;
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
  color: black;
  background: yellow;
  transition: background 2s;
  cursor: pointer;
  :hover {
    box-shadow: 1px 5px 23px rgb(219 255 0);
  }
  span{
    position: relative;
    cursor: pointer;
  }
  .icon{
    position: absolute;
    left: -28px;
    bottom: 0;
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

export const Title = styled.h1`
  color: white;
`;
export const Announcement = styled.h3`
  color: red;
`;

export const RegisterButton = styled.button`
  border: 0;
  outline: 0;
  display: flex;
  background-color: yellow;
  color: black;
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
  cursor: pointer;
  :hover {
    box-shadow:1px 5px 23px rgb(219 255 0);
  }
`;
