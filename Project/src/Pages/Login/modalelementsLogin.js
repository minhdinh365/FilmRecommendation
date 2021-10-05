import styled from 'styled-components'

export const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 12;
`;
export const WrapperModal = styled.div`
  margin-top: 90px;
  width: 400px;
  height: 600px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: rgb(255, 255, 255);
  color: #000;
  display: grid;
  grid-template-rows: 1fr 1fr;
  position: relative;
  z-index: 10;
  border-radius: 10px;

  padding: 10px;
`;
export const Content = styled.div`
  justify-content: center;
  padding: 30px;
  p {
    margin-bottom: 1rem;
  }
  button {
    padding: 10px 20px;
    background-color: #5b83e3;
    color: #fff;
    border: none;
    width: 100%;
    border-radius: 10px;
    margin: 20px 0px;
  }
  h1 {
    display: block;
    justify-content: center;
    font-family: Poppins-Bold;
    font-size: 30px;
    color: #333;
    line-height: 1.2;
    text-align: center;
    font-weight: 600;
  }
  input {
    font-family: Poppins-Medium;
    font-size: 16px;
    line-height: 1.2;
    display: block;
    width: 100%;
    height: 55px;
    background: 0 0;
    padding: 0 7px 0 13px;
  }
  i {
    padding: 0px 5px;
    width: 20px;
    height: 20px;
  }
`;
export const InputField = styled.input`
  border: 2px solid blue;
  border-radius: 5px;
  color: black;
`;
export const OtherSign = styled.div`
  margin-top: 40px;
  justify-content: center;
  display: grid;
  text-decoration: none;
`;
export const Errors = styled.div`
  color: red;
  justify-content: center;
  display: flex;
`;
export const Button = styled.button`
  font-family: serif;
  height: 50px;
  font-size: 23px;
  padding: 10px 20px;
  background-color: #5b83e3;
  color: #fff;
  border: none;
  width: 100%;
  border-radius: 10px;
  margin: 20px 0px;
`