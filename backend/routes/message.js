const express = require("express");
const router = express.Router();
const {
  addMessageToGroup,
  getMessagesByGroupName,
  deleteMessages,
} = require("../controllers/message");

const { verifyToken } = require('../middleware/token')

router.post("/",verifyToken, async (req, res) => {
  console.log(req.query)
  try {
    const newMessage = await addMessageToGroup(
      req.query.name,
      req.body.message,
      req.user
    );
    res.status(200).send(newMessage);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const groupMessages = await getMessagesByGroupName(req.query.name);
    res.status(200).send(groupMessages);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.delete("/", async (req, res) => {
  try {
    const deletedMessage = await deleteMessages(
      req.query.name,
      req.query.messageId
    );
    if (!deletedMessage) {
      return next(
        createCustomError(`No message with id : ${req.query.messageId}`, 404)
      );
    }
    res.status(200).json({ deletedMessage });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
