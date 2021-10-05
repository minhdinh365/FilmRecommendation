import {Comment} from '../models/Comment.js';

export const saveComment = async(req, res) =>{
    try{
        const comment = new Comment(req.boby)
        comment.save((err, comment) =>{
            if(err) return res.json({success : false, err})
            Comment.find({'_id' : comment._id})
            .populate('writer')
            .exec((err, result) =>{
                if(err) return res.json({success: false, err})
                return res.status(200).json({success: true, result})
            })
        });
    }
    catch(err){
        return req.status(500).json({msg: err.message});
    }
}