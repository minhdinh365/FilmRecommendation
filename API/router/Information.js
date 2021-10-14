import express from 'express'
import { getInfo} from '../controllers/Information.js'


const router = express.Router()

router.route('/infor/:username')
   .get(getInfo)

export default router
