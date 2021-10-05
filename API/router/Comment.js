import express from 'express'
import {saveComment} from '../controllers/Comment.js'


const router = express.Router()

router.route('/comment')
    .post(saveComment)

export default router
