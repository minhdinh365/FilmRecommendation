import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import UserInfor from './InformationUser'

export default function Information() {
  const [success, setSuccess] = useState('');
  useEffect(() => {
    let isCancel = false;
    if (!isCancel) {
      setCookiesF();
    }
    return () => {
      isCancel = true
    }
  }, [success])
  async function setCookiesF() {
    const cookieUser = Cookies.get('User')
    if (cookieUser) {
      await setSuccess(jwt_decode(cookieUser).username)
    }
  }
  return (
    <div className="information_user">

      {(success === '')
        ?
        <div className="information-detail-error"><img className="errorPage" src={process.env.PUBLIC_URL + "/images/errorPage.png"} /> </div>
        :
        <UserInfor account={success} />}
    </div>
  )
}