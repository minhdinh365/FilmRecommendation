import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  margin: auto;
  display: inline-block;
  width: 250px;
  input {
    background-color: transparent;
    border: none;
    color: white;
    outline: none;
    border-bottom: 1px solid gray;
  }
`;

export const ListSearch = styled.div`
  position: absolute;
  background-color: black;
  width: 100%;
  height: auto;
  border-bottom-left-radius: 7px;
  border-bottom-right-radius: 7px;
`;

export const CardSearch = styled.div`
  height: 50px;
  width: 100%;
  padding: 5px;
  display: flex;
  background-color: #111111;
  margin-bottom: 5px;
  &:hover {
    background-color: #202125;
    cursor: pointer;
  }
  a {
    transition: none;
  }
`;
export const Img = styled.img`
  width: 30%;
  height: auto;
  object-fit: cover;
`;
export const Title = styled.span`
  color: white;
  font-size: 14px;
  padding: 0px 5px 0px 10px;
  margin: 0;
  display: inline-block;
  text-overflow: ellipsis;
  word-wrap: break-word;
  overflow: hidden;
  max-height: 1.8em;
  line-height: 1.8em;
`;
