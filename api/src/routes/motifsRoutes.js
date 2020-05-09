var express = require('express');
var router = express.Router();
var motifsController = require('../controllers/motifsController.js');

/*
 * GET
 */
router.get('/', motifsController.list);

/*
 * GET
 */
router.get('/:id', motifsController.show);

/*
 * POST
 */
router.post('/', motifsController.create);

/*
 * PUT
 */
router.put('/:id', motifsController.update);

/*
 * DELETE
 */
router.delete('/:id', motifsController.remove);

module.exports = router;
