const express = require('express');
const router = express.Router();
const { addMessageToGroup, getMessagesByGroupName} = require('../controllers/message');

router.post('/', async (req, res) => {
    try {
        const newMessage = await addMessageToGroup(req.query.name, req.body.message);
        res.status(200).send(newMessage)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.get('/', async (req, res) => {
    try {
        const groupMessages = await getMessagesByGroupName(req.query.name);
        res.status(200).send(groupMessages)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

module.exports = router;