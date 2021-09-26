import React,{useState, useEffect} from 'react'
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';


export default function Information() {
  const cookieUser = Cookies.get('User')
  const [success, setSuccess] = useState();
  if(cookieUser){
    setSuccess(jwt_decode(cookieUser))
  }
  console.log('ne:  ' + id)
    return (
        <div className ="information_user">
            {(success === undefined )
            ? 
            <div className="khong"><img className ="errorPage" src = {process.env.PUBLIC_URL + "/images/errorPage.png"} />Bạn cần phải đăng nhập<img src = ''/> </div> 
            : 
            <div className= "co">la : {success}</div>}
        </div>
    )
}