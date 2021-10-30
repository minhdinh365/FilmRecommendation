import React, { useState } from 'react'
import propTypes from "prop-types";
import { useEffect } from 'react';
import axios from 'axios'
import EditIcon from '@mui/icons-material/Edit';
import ChangePassword from '../ChangePassword'
import { LocalhostApi } from '../../API/const'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({});

export default function InformationUser(props) {
    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(schema),
    });
    const [disable, setDisable] = useState(true)
    const [edit, setedit] = useState('Edit')
    const [Account, setAccount] = useState({})
    const [temp, setTemp] = useState({})
    useEffect(() => {
        axios.get(
            LocalhostApi + 'infor?username=' + props.account)
            .then(res => {
                setTemp({
                    username: res.data.account.username,
                    full_name: res.data.account.full_name,
                    email: res.data.account.user.email,
                    password: '123',
                    avatar: res.data.account.avatar,
                    total_comment: res.data.total_comment,
                    evalute: res.data.evalute,
                })
                if (edit !== "Edit") {
                    setAccount(temp)
                }
                else {
                    setAccount({
                        username: res.data.account.username,
                        full_name: res.data.account.full_name,
                        email: res.data.account.user.email,
                        password: '123',
                        avatar: res.data.account.avatar,
                        total_comment: res.data.total_comment,
                        evalute: res.data.evalute,
                    })
                }
            })
            .catch(e => { })
        return () => {
        }
    }, [edit])
    function EditInfor() {
        setDisable(pre => !pre)
        if (edit === 'Edit') {
            setedit('Cancel')
        }
        else {
            setedit('Edit')
        }
    }
    const uploadedImage = React.useRef(null);
    const imageUploader = React.useRef(null);
    const [data, setData] = useState({
        full_name: "",
        username: "",
        email: "",
        avatar: '',
    });
    function handle(e) {
        const newData = { ...data };
        newData[e.target.id] = e.target.value;
        setData(newData);
    }
    const onSubmit = (data) => {
        console.log(data)
    }
    const [changePass, setChangPass] = useState(false)
    const handleImageUpload = (e) => {
        const [file] = e.target.files;
        if (file) {
            const reader = new FileReader();
            const { current } = uploadedImage;
            current.file = file;
            reader.onload = (e) => {
                current.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <>
            <ChangePassword open={changePass} setChangPass={setChangPass} account={Account.username} />
            <div className="information-detail">
                <div className="information-imge-user">
                    <button className="information-imge-user-change" onClick={() => imageUploader.current.click()}>
                        <span>Tải ảnh lên</span>
                        <input
                            type="file"
                            accept="image/*"
                            required
                            onChange={handleImageUpload}
                            ref={imageUploader}
                            style={{ display: "none" }}
                        />
                    </button>
                    <img ref={uploadedImage} src={Account.avatar} alt="no img" />
                    <div className="image-user-interact">
                        <span>{Account.total_comment} comments</span>
                        <span>{Account.evalute} evaluted</span>
                    </div>
                </div>
                <div className="information-infor-user">
                    <h1>Hồ sơ cá nhân</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="infor-user-details">
                            <h2>Họ và tên:</h2>
                            <input {...register("full_name")} onChange={(e) => handle(e)} id="full_name" disabled={disable} type="text" name="full_name" defaultValue={Account.full_name} />
                        </div>
                        <div className="infor-user-details">
                            <h2>Tên đăng nhập:</h2>
                            <input {...register("username")} onChange={(e) => handle(e)} id="username" disabled={disable} type="text" name="username" defaultValue={Account.username} />
                        </div>
                        <div className="infor-user-details">
                            <h2>Email:</h2>
                            <input {...register("email")} onChange={(e) => handle(e)} id="email" disabled={disable} type="text" name="email" defaultValue={Account.email} />
                        </div>
                        <div className="infor-user-details">
                            <h2>Mật Khẩu:</h2>
                            <button className="btn-info" onClick={() => setChangPass(true)}><EditIcon fontSize="medium" />Thay đổi mật khẩu</button>
                        </div>
                        <div className="button-edit-information">
                            {(edit === 'Edit') ?
                                <button className="btn-info" onClick={EditInfor}>Chỉnh sửa</button>
                                :
                                <button className="cancel-edit" onClick={EditInfor}>Hủy bỏ</button>
                            }
                            {(edit !== "Edit") ?
                                <button type="submit" className="btn-info">Lưu</button>
                                : null}
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

InformationUser.propTypes = {
    account: propTypes.string.isRequired,
};
