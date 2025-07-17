const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const verifyToken = require('../middleware/authMiddleware');

router.post('/addTask',verifyToken,taskController.addTask);
router.get('/getTasks',verifyToken,taskController.getTasks);
router.delete('/deleteTask/:id',verifyToken,taskController.deleteTask);
router.put('/updateTask/:id',verifyToken,taskController.updateTask);

module.exports = router;