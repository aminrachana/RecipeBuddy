const mongoose = require('mongoose')

const IngredientsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    season: {
        type: String,
        enum: ['all', 'spring', 'summer', 'fall', 'winter'],
        default: 'all',
    },
    is_vegetarian: {
        type: Boolean,
        default: false
    },
    is_non_vegetarian: {
        type: Boolean,
        default: false
    },
    is_dairy: {
        type: Boolean,
        default: false
    },
    is_egg: {
        type: Boolean,
        default: false
    }
}, { versionKey: false })

module.exports = mongoose.model('Ingredients', IngredientsSchema)