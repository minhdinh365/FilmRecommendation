import {Information} from "../models/Information.js";

export const getInfo = async (req, res) => {
    console.log(req.params.username)
    try { 
        const info = await Information.findOne({username : req.params.username}).populate("user")
        res.json({
            status: 'success',          
            account: info
        })
    } catch (err) { 
        return res.status(500).json({msg: err.message});
    }
};
