var cerfaModel = require("../models/cerfaModel.js");
var multer = require("multer");
var upload = multer({
  dest: "uploads/"
});

/**
 * cerfaController.js
 *
 * @description :: Server-side logic for managing cerfas.
 */
module.exports = {
  /**
   * cerfaController.show()
   */
  show: function(req, res) {
    var id = req.params.id;
    cerfaModel.find(
      {
        adherents: id
      },
      function(err, cerfa) {
        if (err) {
          return res.status(500).json({
            message: "Error when getting cerfa.",
            error: err
          });
        }
        if (!cerfa) {
          return res.status(404).json({
            message: "No such cerfa"
          });
        }
        return res.json(cerfa);
      }
    );
  },

  /**
   * cerfaController.create()
   */
  create: function(req, res) {
    
    var cerfa = new cerfaModel({
      tresoriers: req.body.tresoriers,
      adherents: req.body.adherents,
      cerfa: req.file.filename
    });

    cerfa.save(function(err, cerfa) {
      if (err) {
        return res.status(500).json({
          message: "Error when creating cerfa",
          error: err
        });
      }
      return res.status(201).json(cerfa);
    });
  }
};
