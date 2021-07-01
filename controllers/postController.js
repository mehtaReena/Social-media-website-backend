require("dotenv").config();
const express = require('express');
const mongoose = require("mongoose");
const User = require('../models/user')
const Post = require ('../models/post')


const createPost = async (name, post) => {
    let user = await User.findOne({ name })
    if (!user) return { status: false, result: { message: 'Invalid user' } }
    try {
        const newPost = new Post(post)
        let savedPost = await newPost.save()
        user.posts.push(savedPost)
        await user.save()
        return { status: true, result: user.posts }
    }
    catch(e) {
        return { status: false, result: { message: "Error" + e.message } }
    }


}
async function addLike(req, res) {
    const { id } = req.user;
    const { postId } = req.body;
    console.log(id)
    try {
        let hasLiked = await Post.findOne({ _id: id, likes: { "$in": id } });
        console.log(hasLiked)
        if (hasLiked) {
            return res.json({ "message": "" });
        }
        await Post.findByIdAndUpdate(postId, { $push: { likes: id } });
        return res.json({ "message": "" });
    }
    catch (e) {
        return res.json({ "message": e.message });
    }
}
const deletePost = async (name, inputId) => {
    let id = mongoose.mongo.ObjectID(inputId)
    try {
        await User.updateOne({ name }, { $pull: { posts: id } } )
        await Post.deleteOne({ _id: id })
        return { status: true, result: { message: "Deleted successfully" } }
    }
    catch(e) {
        return { status: false, result: { message: "Error " + e.message } }
    }
}



const allPostsByuserName =async(name)=> {

    try {
        let posts = await User.findOne({ name: name }).populate("posts");
        return res.json(posts);
    }
    catch (e) {
        return res.json({ "message": e.message });
    }
}

const getPostDetail =async(name)=> {
    let user = await User.findOne({ name })
    if (!user) return { status: false, result: { message: 'Invalid user' } }
    try {
        let post = await Post.findOne({ _id: postId }).populate("likes")
        return res.json({ post: post });
    }
    catch (e) {
        return res.json({ "message": e.message });
    }
}


module.exports = {
    createPost,
    addLike,
    deletePost,
    allPostsByuserName,
    getPostDetail
      };