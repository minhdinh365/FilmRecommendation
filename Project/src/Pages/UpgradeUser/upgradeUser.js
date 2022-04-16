import styled, { css } from "styled-components"

export const Container = styled.div`
    margin-top: 80px;
    width: 100%;
    padding 50px 150px;
    height: fit-content;
    min-height: 450px;
    display: block;
    color: white;
    margin-left: -30px;
`
export const Address = styled.span`
    width: 100%;
    padding : 10px;
    border-radius: 5px;    background-color: grey;
    color: white;
    font-size: 17px;
    margin-left: 30px;
`
export const ContainerCard = styled.div`
    margin-top: 20px;
    display: flex;
    width: 100%
`

export const Card = styled.div`
    width: 33%;   

    border:  ${(props) =>
        props.active
            ? css`
                2px solid yellow;
            `
            : css`
                2px solid #837d7d;
            ` };
    border-radius: 15px;
    margin-left: 30px;
    padding : 20px;
    display: flex;
    flex-direction: column;
    &:hover {
        background-color: #161212;
        cursor: pointer;
    }
    background:  ${(props) =>
        props.active
            ? css`
                #161212;
            `
            : css`
                black;
            ` };
 
`

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`

export const NamePackage = styled.h2`
    font-size: 18px;
    font-weight: 300;
`

export const CostPackage = styled.h2`
    font-weight: 300;
    font-family: DauphinPlain;
    font-size: 40px;
    color: yellow;
`
export const DescriptionPackage = styled.h4`
    font-weight: 300;
    color: grey;

`
export const ButtonBuy = styled.button`
    margin-top: auto;
    flex-shrink: 0;
    max-height: 100px;
    padding: 10px;
    outline: none;
    border: none;
    font-size: 15px;
    color: black;
    font-weight: 500;
    background-color: yellow;
    box-shadow: #737676;
    border-radius: 10px;
    cursor: pointer;
    transition: 70ms;
`