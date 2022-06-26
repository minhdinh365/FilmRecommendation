import React, { useState } from 'react'
import ModalSign from "../../Pages/Login/ModalLogin";

export default function SuccessRegister() {
    const [loginOpen, setLoginOpen] = useState(false)
    const [open, setOpen] = useState(true)
    const [register, setregister] = useState(false)
    function closse() {
        setOpen(false)
    }
    function success() {
        setOpen(false);
        setLoginOpen(true)
        setregister(true)
    }
    return (
        <>
            <ModalSign
                open={loginOpen} setLoginOpen={setLoginOpen} registerUser={register}
            ></ModalSign>
            {open ?
                <div className="wrapper-success">
                    <div onClick={closse} className="success-box">
                        <div className="dot"></div>
                        <div className="face">
                            <div className="eye"></div>
                            <div className="eye right"></div>
                            <div className="mouth happy"></div>
                        </div>
                        <div className="shadow scale"></div>
                        <div className="message">
                            <h1 className="alert">Tuyệt vời!</h1>
                            <p>Cảm ơn bạn đã đăng kí ChomFilm.</p>
                        </div>
                        <button onClick={success} className="button-box">
                            <h1 className="green">Đăng nhập ngay</h1>
                        </button>
                    </div>
                </div>
                : null}
        </>
    )
}
