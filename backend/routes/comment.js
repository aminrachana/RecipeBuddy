const commentRouter = require('express').Router()
const Comment = require('../models/Comment')

// POST - add comment
commentRouter.post('/addComment', async (req, res) => {
    try {
        const { recipe_id, user_id, comment } = req.body

        if (!recipe_id || !user_id || !comment) {
            return res.status(400).json({
                message: 'Missing required fields',
                success: false
            })
        }

        let commentObj = await Comment.findOne({ recipe_id, user_id })
        if (commentObj) {
            commentObj.deleteOne()
        }

        commentObj = new Comment({
            recipe_id, user_id, comment
        })

        await commentObj.save()
        const data = await commentObj.populate('recipe_id')
        res.status(200).json({
            isAdded: true,
            success: true,
            data,
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({ success: false })
    }
})

// GET - get rating by recipe
commentRouter.get('/getByRecipe', async (req, res) => {
    try {
        const { recipe_id } = req.query

        if (!recipe_id) {
            let comments = await Comment.find({})
            return res.status(400).json({
                message: 'recipe_id is required',
                success: false,
                data: comments,
            })
        }

        let comments = await Comment.find({ recipe_id }).populate('user_id')

        res.status(200).json({
            success: true,
            data: comments,
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({ success: false })
    }
})

module.exports = commentRouter