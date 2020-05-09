var express = require('express');
var router = express.Router();
var fraisController = require('../controllers/fraisController.js');

/*
 * GET
 */
router.get('/', fraisController.list);

/*
 * GET
 */
router.get('/:id', fraisController.show);

router.get('/userFrais/:id', fraisController.getUserFrais);

/*
 * POST
 */
router.post('/', fraisController.create);

/*
 * PUT
 */
router.put('/:id', fraisController.update);

/*
 * DELETE
 */
router.delete('/:id', fraisController.remove);

router.get('/userFraisTot/:id', fraisController.calcTot);

module.exports = router;