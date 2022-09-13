
const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin')
const Post = mongoose.model("Post")


router.put("/likes",requireLogin, (req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id},
            new:true
        }).exec((err, result)=>{
            if(err){
                return res.status(422).json({error:err})
            }else{
                res.json(result)
            }
        })
})

router.put("/unlike",requireLogin, (req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id},
            new:true
        }).exec((err, result)=>{
            if(err){
                return res.status(422).json({error:err})
            }else{
                res.json(result)
            }
        })
})

module.exports = router