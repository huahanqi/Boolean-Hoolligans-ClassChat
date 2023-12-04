const express = require("express");
const { getAllgroups, createNewGroup } = require("../controllers/group");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newGroup = await createNewGroup(
      req.body.params.name,
      req.body.params.description,
      req.body.params.wiki
    );
    res.status(200).send(newGroup);
  } catch (error) {
    if (error.code == "11000") {
      res.status(400).send({ data: { message: "Duplicate Class" } });
    } else {
      console.log(error);
      res.status(500).send(error);
    }
  }
});

router.get("/", async (req, res) => {
  try {
    const allgroups = await getAllgroups();
    res.status(200).send(allgroups);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
