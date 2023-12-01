const mongoose = require("mongoose");

const group = require("../models/group.js");

const createNewGroup = async function (name, description, wiki) {
  //   try {
  const newGroup = new group({
    name: name,
    description: description,
    wiki: wiki,
  });
  await newGroup.save();
  //   } catch (e) {
  //     console.log("line 14");
  //     console.log(e);
  //     throw e;
  //   }
  return newGroup;
};

const getAllgroups = async function () {
  const groups = await group.find({});
  return groups;
};

exports.createNewGroup = createNewGroup;
exports.getAllgroups = getAllgroups;
