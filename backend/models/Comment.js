const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    recipe_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comment: {
        type: String,
        required: true
    },
}, { timestamps: true, versionKey: false })

module.exports = mongoose.model('Comment', CommentSchema)