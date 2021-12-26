import styled from "styled-components";

export const HeaderUser = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  z-index: 30;
  justify-content: space-between;
  background: #252222;
  display: flex;
`;
export const Backhome = styled.a`
  text-decaration: none;
  &:hover {
    background-color: transparent;
  }
`;
export const ImgLogo = styled.img`
  cusor: pointer;
  margin-left: 20px;
  background-color: transparent;
`;
export const InFoHeader = styled.div`
  display: flex;
  margin-right: 27px;
  div {
    justify-content: center;
    margin: auto;
    margin-right: 10px;
  }
  div > a:first-child {
    color: yellow;
    font-size: 20px;
    cursor: pointer;
  }
  div > div {
    margin-top: 10px;
  }
  div:nth-child(2) {
    justify-content: center;
    align-items: center;
  }
`;
