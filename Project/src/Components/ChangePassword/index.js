import React, { useRef } from "react";
import { useSpring, animated } from "react-spring";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from 'axios'
import { BackgroundForget, WrapperModalForget, ContentForget, InputFieldForget, Errors, ButtonForget } from './modalChange';

const schema = yup.object().shape({
    passwordold: yup.string().required("Vui lòng nhập mật khẩu cũ"),
    passwordnew: yup.string().required("Vui lòng nhập mật khẩu mới")
        .matches(
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            "Mật khẩu phải có ít nhất 8 kí tự, ghi hoa hoặc kí đặc biệt"
        ),
    passwordnew2: yup.string().required("Vui lòng lại nhập mật khẩu mới")
        .oneOf([yup.ref('passwordnew'), null], "Mật khẩu mới không trùng khớp"),
});

const ModalForget = (props) => {
    const { open, account, setChangPass } = props;
    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(schema),
    });
    const { errors } = formState;
    const modalRef = useRef();
    const animatedd = useSpring({
        config: {
            duration: 250,
        },
        opacity: open ? 1 : 0,
        transform: open ? `translateY(0%)` : `translateX(-100%)`,
    });
    const closeModal = (e) => {
        if (modalRef.current === e.target) {
            setChangPass(false);
        }
    };
    const close = (event) => {
        setChangPass(false)
    }
    const onSubmit = (data) => {
        axios.put
        console.log(data);
    };
    return (
        <>
            {open ? (
                <BackgroundForget ref={modalRef} onClick={closeModal} open={open}>
                    <animated.div style={animatedd}>
                        <WrapperModalForget open={open}>
                            <ContentForget>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <h1>Thay đổi mật khẩu</h1>
                                    <span>Mật khẩu cũ</span>
                                    <InputFieldForget
                                        type="text"
                                        placeholder={"Nhập mật khẩu cũ..."}
                                        name="passwordold"
                                        {...register('passwordold')}
                                        autoComplete="off"
                                    ></InputFieldForget>
                                    <Errors>{errors.passwordold?.message}</Errors>
                                    <span>Mật khẩu mới</span>
                                    <InputFieldForget
                                        {...register('passwordnew')}
                                        type="text"
                                        placeholder={"Nhập mật khẩu mới..."}
                                        name="passwordnew"
                                        autoComplete="off"
                                    ></InputFieldForget>
                                    <Errors>{errors.passwordnew?.message}</Errors>
                                    <span>Nhập lại mật khẩu mới</span>
                                    <InputFieldForget
                                        {...register('passwordnew2')}
                                        type="text"
                                        placeholder={"Nhập lại mật khẩu mới..."}
                                        name="passwordnew2"
                                        autoComplete="off"
                                    ></InputFieldForget>
                                    <Errors>{errors.passwordnew2?.message}</Errors>
                                    <div className="btnLogin">
                                        <ButtonForget onClick={close}> Hủy</ButtonForget>
                                        <ButtonForget type="submit">Thay đổi</ButtonForget>
                                    </div>
                                </form>
                            </ContentForget>
                        </WrapperModalForget>
                    </animated.div>
                </BackgroundForget>)
                : null}
        </>
    );
};
export default ModalForget;
