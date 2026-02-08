const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

router.get('/', employeeController.getAllEmployees);
router.get('/add', employeeController.renderAddEmployee);
router.post('/add', employeeController.createEmployee);
router.get('/edit/:id', employeeController.renderEditEmployee);
router.post('/edit/:id', employeeController.updateEmployee);
router.get('/delete/:id', employeeController.deleteEmployee);

module.exports = router;
