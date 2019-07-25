var express = require("express");
var router = express.Router();

var PostModel = require("../models/posts");

/* GET home page. */
router.get("/", (req, res, next) => {
  res.send("Welcome to my API").status(200);
});

// Get all groups that the user is in

router.get("/all/:user_id", async (req, res, next) => {
  const allPosts = await PostModel.getUserGroups();
  res.json(allPosts).status(200);
});

// get a specific group text by its ID
router.get("/post/:post_id?", async (req, res, next) => {
  const postId = req.params.post_id;
  const thePost = await PostModel.getById(postId);
  res.json(thePost).status(200);
});

// delete a group
router.get("/delete/:id?", async (req, res, next) => {
  const postId = req.params.post_id;
  const response = await PostModel.removeGroup(postId);
  console.log("response is", response);
  if (response.command === "DELETE" && response.rowCount >= 1) {
    res.sendStatus(200);
  } else {
    res.send(`Could not delete Post ID ${postId}`).status(409);
  }
});

//create a new group chat
router.post("/add_event", async (req, res) => {
  const { group_name, date_time } = req.body;
  const response = await PostModel.createGroup(group_name, date_time);
  if (response.command === "INSERT" && response.rowCount >= 0) {
    res.sendStatus(200);
  } else {
    res.send(`Could not add new event ${group_name}`).status(409);
  }
});

//add a text in the group chat
router.post("/text", async (req, res) => {
  const { texts } = req.body;
  const response = await PostModel.addText(texts);
  console.log(response);
  if (response.command === "INSERT" && response.rowCount >= 0) {
    res.sendStatus(200);
  } else {
    res.send(`Could not send text ${texts}`).status(409);
  }
});

module.exports = router;
