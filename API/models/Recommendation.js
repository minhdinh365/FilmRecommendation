import mongoose from "mongoose";
import { Film } from "./Film.js";

const schema = mongoose.Schema(
    {
        id_film: {
            type: Number,
            unique: true,
            require: true,
            trim: true,
        },
        recommendation: [{
            type: mongoose.Schema.Types.Mixed,
        }]
    },
);

schema.set('toObject', { virtuals: true });
schema.set('toJSON', { virtuals: true });

export const Recommendation = mongoose.model("recommendations", schema);