const express = require('express')
const router = express.Router();
const Post = require('../models/Post')

router.get('/', async (req, res) => { //get all posts
    try {
        const posts = await Post.find()
        res.json(posts)
    } catch(err) {
        console.log(err)
        res.json({message: err})
    }
})

router.post('/', async (req, res) => { //submit one new posts
    console.log("received")
    console.log(req.body)
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    })

    try {
        const saved = await post.save()
        console.log("saving")
        console.log(saved)
        res.json(saved)
    } catch (err) {
        res.json({message: err})
        console.log(err)
    }
})

//get latest  post
router.get('/latest', async (req, res) => {
    console.log("Getting latest")
    try {
        const latestPost = await Post.find().sort({ _id: -1 }).limit(1)
        res.json(latestPost)
        console.log(latestPost)
    } catch(err) {
        console.log(err)
        res.json({message:err})
    }
})

/*should it be required, I can make it so that one can look
 * look for a specific posts, but one would need the 
 * postID given by MongoDB
 */

module.exports = router