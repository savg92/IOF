var express = require('express');
var router = express.Router();

var controller = require('../controllers/tasks');

// routes
router.get('/', controller.getAllTasks);
router.get('/:id', controller.getTaskById);
router.get('/project/:id', controller.getTasksByProjectId);
router.post('/', controller.createTask);
router.put('/:id', controller.updateTask);
router.delete('/:id', controller.deleteTask);

module.exports = router;