const mongoose = require('mongoose');

const message = require('../models/message.js')
const group = require('../models/group.js')


const addMessageToGroup = async function (groupName, inputMessage) {
    const groupDoc = await group.findOne({name: groupName});
    const newMessage = await new message({
        group: groupDoc._id,
        message: inputMessage,
        date: Date.now()
    });
    newMessage.save();
    return newMessage
}

const getMessagesByGroupName = async function (groupName) {
    const groupDoc = await group.findOne({name: groupName});
    const messages = await message.find({
        group: groupDoc._id,
    });
    return messages;
}

exports.addMessageToGroup = addMessageToGroup;
exports.getMessagesByGroupName = getMessagesByGroupName