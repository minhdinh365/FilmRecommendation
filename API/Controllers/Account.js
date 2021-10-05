import {Account} from '../models/Account.js';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';

export const getAccount = async (req, res) => {
    var username_request = req.body.username
    var password_request = req.body.password
    Account.findOne({        
        username: username_request,
        password : password_request
    })
    .then(data =>{
        if (data){
            console.log(data)
            var token = jwt.sign({
                id : data._id,
                username: data.username,
                email: data.email,
            }, 
            'Account',
            {expiresIn : '1h'})
            return res.json({
                status: 'Susscess',
                message: 'Đăng nhập thành công',
                token : token

            })
        }
        else {
            return res.json({
                status: 'Fail',
                message: 'Tên tài khoản hoặc mật khẩu không chính xác',
            })
        }
    })
    .catch(err =>{
        res.status(300).json('Lỗi Server')
    })
}

export const showAccount = async (req,res) => {
    try {
        const accountAll = await Account.find();
        res.json({
            status: 'success',          
            account: accountAll
        })
    } catch (err) {
        return req.status(500).json({msg: err.message});
    }
}
export const loginInfor = async(req, res, next)=>{
    try{
        var token = req.params.token
        var result = jwt.verify(token,'Account')
        if (result){
            next()
            return res.json({_id :result})
        }
    }
    catch{
        return res.status(500).json({msg: err.message})
    }
}