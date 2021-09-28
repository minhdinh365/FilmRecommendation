import React,{useState, useEffect} from 'react'
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';


export default function Information() {
    const cookieUser = Cookies.get('User')
    const [success, setSuccess] = useState('');
    useEffect(() => {
      if(cookieUser){
        setSuccess(jwt_decode(cookieUser).username)
      }
    }, [cookieUser])
    return (
        <div className ="information_user">
            {(success === '' )
            ? 
            <div className="khong"><img className ="errorPage" src = {process.env.PUBLIC_URL + "/images/errorPage.png"} /> </div> 
            : 
            <div className= "co">la : {success}</div>}
        </div>
    )
}