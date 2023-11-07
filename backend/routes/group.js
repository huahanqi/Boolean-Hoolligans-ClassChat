const express = require('express');
const { getAllgroups, createNewGroup} = require('../controllers/group');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const newGroup = await createNewGroup(req.body.name);
        res.status(200).send(newGroup);
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
})

router.get('/', async (req, res) => {
    try {
        const allgroups = await getAllgroups();
        res.status(200).send(allgroups);
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
})

module.exports = router;

