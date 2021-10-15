import { Button } from '@material-ui/core'
import React,{useState} from 'react'
import propTypes from "prop-types";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function InformationUser(props) {
    const [disable, setDisable] = useState(true)
    const [password, setPassword] = useState('password')
    const [changeIcon, setchangeIcon] = useState(false)
    const [edit, setedit] = useState('Edit')
    const [Account, setAccount] = useState({
        username: props.account,
        full_name: 'Thanh bang',
        email: 'bangnguyen123@gmail.com',
        password: '123',
        avatar: 'none',
        total_comment: 100,
        evalute: 7.5,
    })
    const temp = Account;
    const EditInfor = () =>{
        setDisable(pre => !pre)
        if(edit === 'Edit'){
            setedit('Cancel')
        }
        else{
            setedit('Edit')
            window.location.reload()
        }
    }
    const Showpass =() =>{
        if(password === 'password'){
            setPassword('text')
            setchangeIcon(true)
        }
        else{
            setPassword('password')
            setchangeIcon(false)
        }
    }    
    return (
        <div className ="information-detail">
            <div className ="information-imge-user">
                <img src= 'https://cdn-icons-png.flaticon.com/512/149/149071.png' alt = "no img"/>
                <div className="image-user-interact">
                    <span>Total comments: {Account.total_comment}</span>
                    <span>Evaluted: {Account.evalute}</span>                
                </div>
            </div>
            <div className= "information-infor-user">
                <h1>Profile</h1>
                <div className ="infor-user-details">
                    <h2>Họ và tên:</h2>
                    <input disabled={disable} type= "text" name ="full_name" defaultValue={Account.full_name}/>                
                </div>
                <div className ="infor-user-details">
                    <h2>Tên đăng nhập:</h2>
                    <input disabled={disable} type= "text" name ="username" defaultValue={Account.username}/>              
                </div>
                <div className ="infor-user-details">
                    <h2>Email:</h2>
                    <input disabled={disable} type= "text" name ="email" defaultValue={Account.email}/>                          
                </div>
                <div className ="infor-user-details">
                    <h2>Mật Khẩu:</h2>                
                    <input className="password-change" disabled={disable} type= {password} name ="password" defaultValue={Account.password}/>
                    {changeIcon ? 
                    <VisibilityIcon onClick= {Showpass} fontSize="large" className="password-change-eye"/>   
                    :
                    <VisibilityOffIcon onClick= {Showpass} fontSize="large" className="password-change-eye"/>   
                    }                                    
                </div>          
                <div className= "button-edit-information">
                    {(edit ==='Edit')?
                    <button onClick= {EditInfor}>{edit}</button>
                    :
                    <button className="cancel-edit" onClick= {EditInfor}>{edit}</button>
                    }
                    <button>Back to home</button>
                </div>
                
            </div>
        </div>
    )
}

InformationUser.propTypes ={
    account: propTypes.string.isRequired,
};
