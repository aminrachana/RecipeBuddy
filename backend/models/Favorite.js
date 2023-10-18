const mongoose = require('mongoose')

const FavoriteSchema = new mongoose.Schema({
    recipe_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Recipe'
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }
}, { versionKey: false })

module.exports = mongoose.model('Favorite', FavoriteSchema)