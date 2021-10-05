import mongoose from 'mongoose';

const schema = mongoose.Schema({
    adult: {
        type: Boolean,
        require: true,
        trim: true,
      },
      backdrop_path: {
        type: String,
        trim: true,
      },
      genre_ids: {
        type: mongoose.Schema.Types.Mixed,
        trim: true,
      },
      id: {
        type: Number,
        trim: true,
        require: true
      },
      original_language:{
        type: String,
        trim: true,
      },
      original_title: {
        type: String,
        trim: true,
      },
      overview: {
        type: String,
        trim: true,
      },
      popularity: {
        type: Number,
        trim: true,
      },
      poster_path: {
        type: String,
        trim: true,
      },
      release_date: {
        type: String,
        trim: true,
      },
      title: {
        type: String,
        trim: true,
      },
      video: {
        type: Boolean,
        trim: true,
      },
      vote_average: {
        type: Number,
        trim: true,
      },
      vote_count: {
        type: Number,
        trim: true,
      },
})

export const Film = mongoose.model('filmlists', schema)