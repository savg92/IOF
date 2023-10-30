var express = require('express');
var router = express.Router();

var controller = require('../controllers/projects');

// routes
router.get('/', controller.getAllProjects);
router.get('/:id', controller.getProjectById);
router.post('/', controller.createProject);
router.put('/:id', controller.updateProject);
router.delete('/:id', controller.deleteProject);

module.exports = router;