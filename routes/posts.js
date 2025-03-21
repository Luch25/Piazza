const express = require('express')
const router = express.Router()

const Post = require('../models/Post')
const verifyToken = require('../verifyToken')

router.get('/', async(req,res) =>{
    try{
        const posts = await Post.find()
        res.send(posts)
    }catch(err){
        res.status(400).send({message:err})
    }
})

router.get('/:id', async(req,res) =>{
    try{
        const post = await Post.findById(req.params.id)
        res.send(post)
    }catch(err){
        res.status(400).send({message:err})
    }
})

router.post('/', verifyToken, async(req, res) => {
    console.log(req)
    // Code to insert data
    const post = new Post({
        title:req.body.title,
        description:req.body.description,
        likes:req.body.likes,
        createdBy:req.user._id
    })
    try{
        const savedPost = await post.save()
        res.send(savedPost)
    }catch(err){
        res.status(400).send({message:err})
    }
    
})

router.delete('/:id', verifyToken, async(req, res) => {
    try{
        const post = await Post.findById(req.params.id)
        await Post.deleteOne(post)
        res.send({deletedPost:post})
    }catch(err){
        res.status(400).send({message:err})
    }
})

router.put('/:id', verifyToken, async(req, res) => {
    try{
        const post = await Post.findById(req.params.id)
        await Post.updateOne(post, req.body)
        res.send({updatedPost:post})
    }catch(err){
        res.status(400).send({message:err})
    }
})

module.exports = router