import mongoose from 'mongoose';

const schema = mongoose.Schema({
    writer:{
        type : String,
        trim : true,
        ref: 'Account',
    },
    postId : {
        type : String,
        require: true,
        trim: true,
        ref: 'Film',
    },
    responseTo:{
        type: String,
        require: true,
        trim: true,
        ref: 'Account'
    },
    content:{
        type: String,
    }

},{timestamps : true});

export const Comment = mongoose.model('comment', schema)