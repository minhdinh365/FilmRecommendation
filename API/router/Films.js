import express from 'express'
import {postFilms, getFilms} from '../controllers/Films.js'


const router = express.Router()

router.route('/films')
    .post(postFilms).get(getFilms)

export default router
