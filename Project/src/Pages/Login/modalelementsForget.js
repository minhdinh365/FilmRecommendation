import styled from 'styled-components'


export const BackgroundForget = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 12;
`;
export const WrapperModalForget = styled.div`
  margin-top: 10px;
  width: 400px;
  height: 300px;
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
export const ContentForget = styled.div`
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
    margin: 20px 10px;
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
export const InputFieldForget = styled.input`
  border: 2px solid gray;
  border-radius: 5px;
  color: black;
`;
export const ErrorsForget = styled.div`
  color: red;
  justify-content: center;
  display: flex;
  z-index: 5;
`;
export const ButtonForget = styled.button`
  height: 40px;
  font-size: 15px;
  padding: 10px 20px;
  background-color: #5b83e3;
  color: #fff;
  border: none;
  width: 100%;
  border-radius: 10px;
  margin: 0;
`