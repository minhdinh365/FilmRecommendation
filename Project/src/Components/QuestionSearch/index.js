import React, { useRef } from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import { Button } from "react-bootstrap";
// import Field from './Field'
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const WrapperModal = styled.div`
  width: 600px;
  height: 400px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background-color: rgb(247, 202, 201);
  color: #000;
  display: grid;
  grid-template-rows: 1fr 1fr;
  position: relative;
  z-index: 10;
  border-radius: 10px;
  justify-content: center;

  padding: 10px;
`;
const Content = styled.div`
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
    line-height: 1.2;
    text-align: center;
    font-weight: 600;
    background-color: white;
    border-radius: 5px;
    padding: 20px;
  }
  h2 {
    text-align: center;
  }
`;

// const ListQuestions = (list) =>{

//     return list.map((a) =>{
//         <WrapperModal showModalQuestions = {showModalQuestions}>
//             <Content>
//                 <div>
//                     <h1>Chào mừng bạn đến với ChomFilms</h1>
//                     <h2>Hãy trả lời một số câu hỏi sau của ChomFilms sẽ giúp tìm cho bạn các bộ phim hay nhá</h2>
//                 </div>
//                 <div>
//             <Button>
//                 Bắt đầu thôi
//             </Button>
//                 </div>
//             </Content>
//         </WrapperModal>
//     })

// }

export const ModalQuestions = ({
  showModalQuestions,
  setShowModalQuestions,
}) => {
  // const { register, handleSubmit, formState } = useForm(
  //     {
  //         resolver: yupResolver(schema),
  //     }
  // );
  // const {errors} = formState;
  // const onSubmit = (data) => console.log(data);
  const modalRef = useRef();
  const animatedd = useSpring({
    config: {
      duration: 250,
    },
    opacity: showModalQuestions ? 1 : 0,
    transform: showModalQuestions ? `translateX(0%)` : `translateY(-100%)`,
  });
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModalQuestions(false);
    }
  };
  return (
    <>
      {showModalQuestions ? (
        <Background ref={modalRef} onClick={closeModal}>
          <animated.div style={animatedd}>
            <WrapperModal showModalQuestions={showModalQuestions}>
              <Content>
                <div>
                  <h1>Chào mừng bạn đến với ChomFilms</h1>
                  <h2>
                    Hãy trả lời một số câu hỏi sau của ChomFilms sẽ giúp tìm cho
                    bạn các bộ phim hay nhá
                  </h2>
                </div>
                <div>
                  <Button>Bắt đầu thôi</Button>
                </div>
              </Content>
            </WrapperModal>
          </animated.div>
        </Background>
      ) : null}
    </>
  );
};
export default ModalQuestions;
