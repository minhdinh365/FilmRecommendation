import React, { useState } from 'react'
import propTypes from "prop-types";
import { useEffect } from 'react';
import axios from 'axios'
import EditIcon from '@mui/icons-material/Edit';
import ChangePassword from '../ChangePassword'
import { LocalhostApi } from '../../API/const'

export default function InformationUser(props) {
    const [disable, setDisable] = useState(true)
    const [password, setPassword] = useState('password')
    const [changeIcon, setchangeIcon] = useState(false)
    const [edit, setedit] = useState('Edit')
    const [Account, setAccount] = useState({})
    useEffect(() => {
        axios.get(
            LocalhostApi + 'infor?username=' + props.account)
            .then(res => {
                setAccount({
                    username: res.data.account.username,
                    full_name: res.data.account.full_name,
                    email: res.data.account.user.email,
                    password: '123',
                    avatar: res.data.account.avatar,
                    total_comment: res.data.total_comment,
                    evalute: res.data.evalute,
                })
            })
            .catch(e => { })
        return () => {
        }
    }, [edit])
    const EditInfor = () => {
        setDisable(pre => !pre)
        if (edit === 'Edit') {
            setedit('Cancel')
        }
        else {
            setedit('Edit')
            window.location.reload()
        }
    }
    const Showpass = () => {
        if (password === 'password') {
            setPassword('text')
            setchangeIcon(true)
        }
        else {
            setPassword('password')
            setchangeIcon(false)
        }
    }
    const [changePass, setChangPass] = useState(false)
    return (
        <>
            <ChangePassword open={changePass} setChangPass={setChangPass} account={Account.username} />
            <div className="information-detail">
                <div className="information-imge-user">
                    <img src={Account.avatar} alt="no img" />
                    <div className="image-user-interact">
                        <span>{Account.total_comment} comments</span>
                        <span>{Account.evalute} evaluted</span>
                    </div>
                </div>
                <div className="information-infor-user">
                    <h1>Hồ sơ cá nhân</h1>
                    <div className="infor-user-details">
                        <h2>Họ và tên:</h2>
                        <input disabled={disable} type="text" name="full_name" defaultValue={Account.full_name} />
                    </div>
                    <div className="infor-user-details">
                        <h2>Tên đăng nhập:</h2>
                        <input disabled={disable} type="text" name="username" defaultValue={Account.username} />
                    </div>
                    <div className="infor-user-details">
                        <h2>Email:</h2>
                        <input disabled={disable} type="text" name="email" defaultValue={Account.email} />
                    </div>
                    <div className="infor-user-details">
                        <h2>Mật Khẩu:</h2>
                        <button onClick={() => setChangPass(true)}><EditIcon fontSize="medium" />Thay đổi mật khẩu</button>
                    </div>
                    <div className="button-edit-information">
                        {(edit === 'Edit') ?
                            <button onClick={EditInfor}>Chỉnh sửa</button>
                            :
                            <button className="cancel-edit" onClick={EditInfor}>Hủy bỏ</button>
                        }
                        <button onClick={() => window.location.href = "http://localhost:3000"}>Về trang chủ</button>
                    </div>

                </div>
            </div>
        </>
    )
}

InformationUser.propTypes = {
    account: propTypes.string.isRequired,
};
