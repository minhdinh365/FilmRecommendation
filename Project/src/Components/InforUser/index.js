import React,{useState} from 'react'
import Cookies from 'js-cookie';
import { useRouteMatch } from 'react-router-dom';

export default function index(props) {
    const [cookie, setcookie] = useState({
        username: Cookies.get('User'),

    })
    const {
        params: { id },
      } = useRouteMatch('/inforuser/:id');
    console.log('ne:  ' + id)
    return (
        <div className ="information_user">
            {cookie.username === undefined || cookie.username === null  || cookie.username === ""
            ? 
            <div className="khong">ban can phai dang nhap <img src = ''/> </div> 
            : 
            <div className= "co">la : {cookie.username + id}</div>}
        </div>
    )
}
