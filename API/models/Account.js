import mongoose from 'mongoose';

const schema = mongoose.Schema({
    username:{
        type : String,
        unique : true,
        require : true,
        trim : true,
    },
    role :{
        type: Number,
        trim: true,
        require: true,
    },
    email:{
        type: String,
        trim: true,
    },
    password : {
        type : String,
        require: true,
        trim: true,
    },

},{timestamps : true});

export const Account = mongoose.model('accounts', schema)