var express = require('express');
var router = express.Router();
var cerfaController = require('../controllers/cerfaController.js');
var multer = require('multer')
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('This image type is not accepted'), false);
  }
};
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + new Date() + '.pdf')
  }
})
var upload = multer({
  storage: storage,
  fileFilter
})

router.get('/:id', cerfaController.show);

/*
 * POST
 */
router.post('/', upload.single('cerfa'), cerfaController.create);


module.exports = router;