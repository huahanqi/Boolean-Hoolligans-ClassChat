const mongoose = require("mongoose");

const message = require("../models/message.js");
const group = require("../models/group.js");
const user = require("../models/user.js");

const addMessageToGroup = async function (groupName, inputMessage, user) {
  // const userDoc = await user.findById(user.userId)
  const groupDoc = await group.findOne({ name: groupName });
  const newMessage = await new message({
    user: user.userId,
    group: groupDoc._id,
    message: inputMessage,
    date: Date.now(),
  });
  newMessage.save();
  return newMessage;
};

const getMessagesByGroupName = async function (groupName) {
  const groupDoc = await group.findOne({ name: groupName });
  const messages = await message.find({
    group: groupDoc._id,
  }).populate({
    path: 'user',
    select: 'username firstName lastName' // specify the fields to include
  }).exec();
  return messages;
};

const deleteMessages = async (groupName, messageId) => {
  const groupDoc = await group.findOne({ name: groupName });
  const deletingMessage = await message.findOneAndDelete({
    group: groupDoc._id,
    _id: messageId,
  });
  return deletingMessage;
};

exports.addMessageToGroup = addMessageToGroup;
exports.getMessagesByGroupName = getMessagesByGroupName;
exports.deleteMessages = deleteMessages;
