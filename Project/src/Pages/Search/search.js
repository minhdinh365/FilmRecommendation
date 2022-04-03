import styled from "styled-components";

export const Container = styled.div`
    margin-top: 100px;
    width: 100%;
    padding 50px 150px;
    height: fit-content;
    min-height: 450px;
    & section > div > div {
        width: 100%;
    }
`
export const SearchFor = styled.span`
    background-color: #141313;
    padding: 10px;
    color: white;
    border-radius: 5px;
    display: flex;
    width: 95%;
    margin: auto;
    justify-content: space-between;
    & ion-icon {
        font-size: 12px;
        margin-right: 10px;
    } 
`
export const ContainerFilter = styled.div`
    display: flex;
    margin-bottom: 50px;
    
    & select {
        margin-left: 10px;
        color: black;
        background-color: yellow;
        border-radius: 15px;
        font-size: 15px;
        cursor: pointer;
    }
    & select > option{
       color: white;
       background-color: black;
       border: none;
       padding: 15px;
       cursor: pointer;
    }
    & select > option:hover{
        color: red;
        background-color: black;
        border: none;
     }
`
export const Dropdown = styled.div`
    background-color: yellow;
    color: black;
    padding: 16px;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
`
export const ButonDropDown = styled.div`  
    position: relative;
    display: inline-block;
`
export const DropdownContent = styled.div`
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;     
    & span {
        color: black;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
    }
    & span:hover{
        background-color: #f1f1f1
    }  

`