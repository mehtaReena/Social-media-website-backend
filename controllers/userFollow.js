const express = require('express');
const mongoose = require("mongoose");
const User = require('../models/user')
const Post = require ('../models/post')

 const addFollow= async()=>{
    let user = await User.findOne({ name })
    if (!user) return { status: false, result: { message: 'Invalid user' } }




 }



module.exports = {
    addFollow
      };