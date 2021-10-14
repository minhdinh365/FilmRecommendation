import express from 'express'

import {getFilmById, postFilms, getFilms, getFilmsNowPlaying, getFilmsPopular, getFilmsToprated, getFilmsUpcoming} from '../controllers/Films.js'


const router = express.Router()

router.route('/films')
    .post(postFilms)
    .get(getFilms)
router.route('/films/popular')
    .get(getFilmsPopular)
router.route('/films/top_rated')
    .get(getFilmsToprated)
router.route('/films/upcoming')
    .get(getFilmsUpcoming)
router.route('/films/now_playing')
    .get(getFilmsNowPlaying)
router.route('/film/:id').get(getFilmById)

export default router
 