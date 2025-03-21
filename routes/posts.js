const express = require('express')
const router = express.Router()

const Post = require('../models/Post')
const verifyToken = require('../verifyToken')

const {postValidation,updateValidation} = require('../validations/validation')


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
    
    const {error} = postValidation(req.body)
    if(error){
        return res.status(400).send({message:error['details'][0]['message']})
    }

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

        if(!post){
            res.status(400).send({message:"Post did not exist"})
        }

        await Post.deleteOne(post)
        res.send({deletedPost:post})
    }catch(err){
        res.status(400).send({message:err})
    }
})

router.put('/:id', verifyToken, async(req, res) => {

    const {error} = updateValidation(req.body)
    if(error){
        return res.status(400).send({message:error['details'][0]['message']})
    }

    try{
        let post = await Post.findById(req.params.id)

        if(!post){
            res.status(400).send({message:"Post did not exist"})
        }

        await Post.updateOne(post, req.body)
        //Need to get the new Post with the updated information
        post = await Post.findById(req.params.id)
        
        res.send({updatedPost:post})
    }catch(err){
        res.status(400).send({message:err})
    }
})

module.exports = router