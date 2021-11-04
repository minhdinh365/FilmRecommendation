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
export const ImgBG = styled.img`
  position: absolute;
  height: 100vh;
  width: 100%;
  z-index: -2;
  object-fit: cover;
`;
export const ImgBGu = styled.div`
  position: absolute;
  height: 100vh;
  width: 100%;
  z-index: -1;
  background-color: #000000de;
`;

export const Card = styled.div`
  margin-top: 70px;
  width: 70%;
  border-radius: 7px;
  display: flex;
  background-color: rgba(19, 35, 47);
`;

export const ImageTemp = styled.div`
  width: 100px;
  height: 100px;
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
  background-color: black;
  text-decoration: none;
  &:hover{
    color: yellow;
  }
`;

export const Upload = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
  margin:auto;
`;
export const Introduce = styled.div`
  width: 50%;
  display: block;
  justify-content: center;
  align-items: center;
  padding: 5% 0;
  position: relative;
  @media screen and (max-width: 1024px) {
    display: none;
  }
  & img:nth-child(4){
    z-index: 2; 
    position: relative; 
    width: 80%; 
    margin: auto; 
    height: auto; 
    display: flex;
  }
  & h1:nth-child(3){
    z-index: 2;
  }
  img{
    top: 0;
    left: 0;
    position:absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index:1;
  }
  .img-gb{
    z-index:2;
    top: 0;
    left: 0;
    position:absolute;
    width: 100%;
    height: 100%;
    background-color: #000000f2;
    border-bottom: 1px solid; 
    border-left: 1px solid; 
    border-top: 1px solid;
  }
  p{
    text-align: center;
    z-index:3;  
    margin: auto;
    padding: 0;  
    display: flex;
    position: relative;
    justify-content: center;
  }
  span{
    text-align: center;
    z-index:3;  
    margin: auto;
    padding: 0;  
    display: flex;
    position: relative;
    justify-content: center;
    color: yellow;  
  }
`;
export const Title = styled.h1`
  position: relative;
  justify-content: center;
  color: yellow;
  z-index: 5;
  text-align: center;
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
  padding: 10px 10px 10px 30px;
  border-radius: 5px;
  color: white;
  background: gray;
  transition: background 2s;
  cursor: pointer;
  margin: 0px 20px;
  position: relative;
  :hover {
    box-shadow: 1px 2px 15px rgb(219 255 255);
  }
  span{
    position: relative;
    cursor: pointer;
  }
  .icon{
    position: absolute;
    bottom: 0;
  }
`;

export const Information = styled.div`
  margin: auto;
  padding: 20px;
  width: 40%;
  color: #333;
  justify-content: center;
  font-weight: 700;
  @media screen and (max-width: 1024px) {
    margin: auto;
    width:100%;
  }
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
  & .MuiOutlinedInput-input{
    padding: 15px 5px;
  }
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
