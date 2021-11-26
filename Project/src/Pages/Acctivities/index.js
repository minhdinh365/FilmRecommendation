import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import HeaderUser from '../../Components/NavUser'
import Acctivity from '../../Components/Acctivities'

function Index() {
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
    useEffect(() => {
        document.title = "Hoạt động gần đây"
    })
    async function setCookiesF() {
        const cookieUser = Cookies.get('User')
        if (cookieUser) {
            await setSuccess(jwt_decode(cookieUser).username)
        }
    }
    return (
        <div className="acctivities">
            <HeaderUser />
            {(success === '') ? <div>Error</div> :
                <Acctivity account={success} />
            }
        </div>

    )

}
export default Index