const express = require("express");

const jwt = require("jsonwebtoken");

const router = express.Router();
const userFollowController = require("../controllers/userFollow");



router.post("/", async (req, res) => {
    let header = req.headers["authorization"];
    let token = header.split(" ")[1];
    let user = jwt.decode(token);
    let result = await userFollowController.addFollow(user.name, req.body);
    if (result.status) {
        res.status(201).send(result.result);
    } else {
        res.status(401).send(result.result);
    }
});






module.exports = router;

