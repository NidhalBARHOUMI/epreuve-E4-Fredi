var express = require('express');
var router = express.Router();
var ligueSportiveController = require('../controllers/ligueSportiveController.js');

/*
 * GET
 */
router.get('/', ligueSportiveController.list);

/*
 * GET
 */
router.get('/:id', ligueSportiveController.show);

/*
 * POST
 */
router.post('/', ligueSportiveController.create);

/*
 * PUT
 */
router.put('/:id', ligueSportiveController.update);

/*
 * DELETE
 */
router.delete('/:id', ligueSportiveController.remove);

module.exports = router;
