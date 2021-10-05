import express from 'express'
import {searchFilms} from '../controllers/Search.js'


const router = express.Router()

router.route('/search')
    .get(searchFilms)

export default router
