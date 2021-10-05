import {Film} from "../models/Film.js";

export const searchFilms = async(req, res) =>{
    try{
        const filters = req.query.id;
        if(filters === 'Hanh Dong')
        Film.find({gener_ids: 37})
        .then(data =>{
            res.json({
                status : 'success',
                results : data
            })

        })
    }
    catch{
        return req.status(500).json({msg: err.message});
    } 
}