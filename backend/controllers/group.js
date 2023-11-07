const mongoose = require('mongoose');

const group = require('../models/group.js')


const createNewGroup = async function (groupName) {
    const newGroup = await new group({
        name: groupName
    });
    newGroup.save();
    return newGroup
}

const getAllgroups = async function () {
    const groups = await group.find({});
    return groups;
}

exports.createNewGroup = createNewGroup;
exports.getAllgroups = getAllgroups;