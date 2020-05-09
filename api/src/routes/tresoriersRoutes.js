var express = require('express');
var router = express.Router();
var tresoriersController = require('../controllers/tresoriersController.js');

/*
 * GET
 */
router.get('/', tresoriersController.list);

/*
 * GET
 */
router.get('/:id', tresoriersController.show);

/*
 * POST
 */
router.post('/signup', tresoriersController.create);
router.post('/signin', tresoriersController.signin);

/*
 * PUT
 */
router.put('/:id', tresoriersController.update);

/*
 * DELETE
 */
router.delete('/:id', tresoriersController.remove);

router.post('/newPassword', tresoriersController.newPassword);

module.exports = router;