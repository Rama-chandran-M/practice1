const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.post('/addTask',taskController.addTask);
router.get('/getTasks',taskController.getTasks);
router.delete('/deleteTask/:id',taskController.deleteTask);
router.put('/updateTask/:id',taskController.updateTask);

module.exports = router;