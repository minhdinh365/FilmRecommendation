import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  margin: auto;
  display: inline-block;
  width: 250px;

  input {
    background-color: transparent;
    border-radius: 40px;
    color: white;
    outline: none;
    border: 1px solid gray;
    display:inline-block;
  }
  .input:after {
    font-family: 'FontAwesome';
    content: '\f274';
    position: absolute;
    right: 6px;
}
`;
export const Wrapper = styled.div`
  position: relative; 
  ion-icon {
    color: white;
    margin-left: 5px;
    cursor: pointer;
  }
`
export const WrapperIcon = styled.div`
  position: absolute;
  top: 2px;
  right: 0;
  display: flex;
`

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
  & span:nth-child(2) {
    font-size: 11px;
    top: -10px;
    color: yellow;
  }
`;
export const Img = styled.img`
  min-width: 30%;
  height: auto;
  object-fit: cover;
`;
export const Title = styled.span`
  color: white;
  font-size: 13px;
  padding: 0px 5px 0px 10px;
  margin: 0;
  display: block;
  text-overflow: ellipsis;
  word-wrap: break-word;
  overflow: hidden;
  max-height: 1.8em;
  line-height: 1.8em;
`;
export const Input = styled.input`
`