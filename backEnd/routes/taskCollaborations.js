var express = require('express');
var router = express.Router();

var controller = require('../controllers/taskCollaborations');

// routes
router.get('/', controller.getAllTaskCollaborations);
router.get('/task/:id', controller.getTaskCollaborationsByTaskId);
router.get('/user/:id', controller.getTaskCollaborationsByUserId);
router.post('/', controller.createTaskCollaboration);
router.delete('/:taskId/:userId', controller.deleteTaskCollaboration);

module.exports = router;