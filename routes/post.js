const express = require("express");

const jwt = require("jsonwebtoken");

const router = express.Router();
const postController = require("../controllers/postController");

router.get("/:userName", async (req, res) => {
    let header = req.headers["authorization"];
    let token = header.split(" ")[1];
    let user = jwt.decode(token);
    let params = req.query
    let result = await postController.allPostsByuserName(user.name, params);
    res.status(200).send(result.result);
})


router.get("/", async (req, res) => {
    let header = req.headers["authorization"];
    let token = header.split(" ")[1];
    let user = jwt.decode(token);
    let result = await postController.getPostDetail(user.name);
    res.status(200).send(result.result);
})


router.post("/", async (req, res) => {
    let header = req.headers["authorization"];
    let token = header.split(" ")[1];
    let user = jwt.decode(token);
    let result = await postController.createPost(user.name, req.body);
    if (result.status) {
        res.status(201).send(result.result);
    } else {
        res.status(401).send(result.result);
    }
});


router.delete("/:id", async (req, res) => {
    let header = req.headers["authorization"];
    let token = header.split(" ")[1];
    let user = jwt.decode(token);
    let result = await postController.deletePost(user.name, req.params.id);
    if (result.status) {
        res.status(201).send(result.result);
    } else {
        res.status(401).send(result.result);
    }
})



module.exports = router;

