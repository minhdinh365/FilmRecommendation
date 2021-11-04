import mongoose from "mongoose";

const schema = mongoose.Schema({
    username: {
        type: String,
        require: true,
        trim: true,
        unique: false,
    },
    id: {
        type: Number,
        ref: "filmlists",
        trim: true,
        unique: true,
    },
    watched: {
        type: Boolean,
        require: true,
        trim: true,
    },
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    });

schema.virtual("infoFilm", {
    ref: "filmlists",
    localField: "id",
    foreignField: "id",
    justOne: true,
});

export const Watchedes = mongoose.model("watchedes", schema);