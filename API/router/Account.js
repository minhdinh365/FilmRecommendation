import express from 'express'
import {getAccount, showAccount,loginInfor} from '../controllers/Account.js'


const router = express.Router()

router.route('/account')
    .post(getAccount)
    .get(showAccount)

router.route('/account/infor/:username')
    .post(loginInfor)

export default router
