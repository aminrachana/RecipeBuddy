const mongoose = require('mongoose');
const Comment = require('./Comment');
const Favorite = require('./Favorite');
const Rating = require('./Rating');
const Recipe = require('./Recipe');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['general', 'cook', 'admin', 'store'],
        default: 'general',
        required: true
    },
    is_blocked: {
        type: Boolean,
        default: false,
        required: true
    },
    bio: {
        type: String,
    },
    is_recommended: {
        type: Boolean,
        default: false,
        required: true
    },
    // badge_ids: {
    //     type: String,
    //     required: true
    // }
}, { versionKey: false })

UserSchema.pre('remove', async function (next) {
    const userId = this._id;
    // // Perform cascading delete for related records in Recipe, Favorite, Rating, Comment models
    // Recipe.remove({ cook_id: userId }).exec();
    // Favorite.remove({ user_id: userId }).exec();
    // Rating.remove({ user_id: userId }).exec();
    // Comment.remove({ user_id: userId }).exec();
    // next();
    try {
        // Delete related records from other models
        await Recipe.deleteMany({ cook_id: userId });
        await Favorite.deleteMany({ user_id: userId });
        await Rating.deleteMany({ user_id: userId });
        await Comment.deleteMany({ user_id: userId });

        next();
    } catch (err) {
        // Handle any errors here
        next(err);
    }
});

module.exports = mongoose.model('User', UserSchema)