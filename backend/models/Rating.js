const mongoose = require('mongoose')

const RatingSchema = new mongoose.Schema({
    recipe_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    rating_stars: {
        type: Number,
        enum: [1, 2, 3, 4, 5]
    },
}, { timestamps: true, versionKey: false })

module.exports = mongoose.model('Rating', RatingSchema)