var express = require('express');
var router = express.Router();
var adherentsController = require('../controllers/adherentsController.js');

/*
 * GET
 */
router.get('/', adherentsController.list);

/*
 * GET
 */
router.get('/:id', adherentsController.show);
router.post('/search', adherentsController.filter);

/*
 * POST
 */
router.post('/signup', adherentsController.create);
router.post('/signin', adherentsController.signin);

/*
 * PUT
 */
router.put('/:id', adherentsController.update);

/*
 * DELETE
 */
router.delete('/:id', adherentsController.remove);

router.post('/newPassword', adherentsController.newPassword);

module.exports = router;