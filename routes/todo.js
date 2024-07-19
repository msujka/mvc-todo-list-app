const express = require("express");
const router = express.Router();
const {create, read, removeTodo } = require('../controller/index.js');

router.post('/todo/create', create);
router.get('/todos', read);
router.delete('/todo/:id', removeTodo);

module.exports = router;