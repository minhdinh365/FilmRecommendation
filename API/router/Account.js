import express from 'express'
// import { getAdmins} from '../controllers/Admin.js'
import {getAccount, showAccount,loginInfor} from '../controllers/Account.js'


const router = express.Router()

router.route('/account')
    .post(getAccount)
    .get(showAccount)

router.route('/account/infor')
    .post(loginInfor)

export default router
