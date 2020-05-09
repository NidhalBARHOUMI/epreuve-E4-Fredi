var fraisModel = require("../models/fraisModel.js");

/**
 * fraisController.js
 *
 * @description :: Server-side logic for managing fraiss.
 */
module.exports = {
  calcTot: function(req, res) {
    var id = req.params.id;
    fraisModel.find(
      {
        adherents: id
      },
      function(err, frais) {
        if (err) {
          return res.status(500).json({
            message: "Error when getting frais.",
            error: err
          });
        }
        var tot = 0;
        frais.forEach(element => {
          if (element.repasV) {
            tot += element.repas;
          }
          if (element.peageV) {
            tot += element.peage;
          }
          if (element.hbgV) {
            tot += element.hbg;
          }
        });
        return res.json(tot);
      }
    );
  },

  /**
   * fraisController.list()
   */
  list: function(req, res) {
    fraisModel.find(function(err, fraiss) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting frais.",
          error: err
        });
      }
      return res.json(fraiss);
    });
  },

  /**
   * fraisController.show()
   */
  show: function(req, res) {
    var id = req.params.id;
    fraisModel.findOne(
      {
        _id: id
      },
      function(err, frais) {
        if (err) {
          return res.status(500).json({
            message: "Error when getting frais.",
            error: err
          });
        }
        if (!frais) {
          return res.status(404).json({
            message: "No such frais"
          });
        }
        return res.json(frais);
      }
    );
  },

  /**
   * fraisController.getUserFrais()
   */
  getUserFrais: function(req, res) {
    var id = req.params.id;
    fraisModel.find(
      {
        adherents: id
      },
      function(err, frais) {
        if (err) {
          return res.status(500).json({
            message: "Error when getting frais.",
            error: err
          });
        }
        if (!frais) {
          return res.status(404).json({
            message: "No such frais"
          });
        }
        return res.status(200).json(frais);
      }
    );
  },

  /**
   * fraisController.create()
   */
  create: function(req, res) {
    var frais = {};
    if (req.body.date) {
      frais.date = req.body.date;
    }
    if (req.body.trajet) {
      frais.trajet = req.body.trajet;
    }
    if (req.body.km) {
      frais.km = req.body.km;
    }
    if (req.body.hbg) {
      frais.hbg = req.body.hbg;
    }
    if (req.body.repas) {
      frais.repas = req.body.repas;
    }
    if (req.body.peage) {
      frais.peage = req.body.peage;
    }
    if (req.body.adherents) {
      frais.adherents = req.body.adherents;
    }
    if (req.body.motifs) {
      frais.motifs = req.body.motifs;
    }
    var newfrais = new fraisModel(frais);

    newfrais.save(function(err, frais) {
      if (err) {
        return res.status(500).json({
          message: "Error when creating frais",
          error: err
        });
      }
      return res.status(201).json(frais);
    });
  },

  /**
   * fraisController.update()
   */
  update: function(req, res) {
    var id = req.params.id;
    fraisModel.findOne(
      {
        _id: id
      },
      function(err, frais) {
        if (err) {
          return res.status(500).json({
            message: "Error when getting frais",
            error: err
          });
        }
        if (!frais) {
          return res.status(404).json({
            message: "No such frais"
          });
        }

        frais.date = req.body.date ? req.body.date : frais.date;
        frais.trajet = req.body.trajet ? req.body.trajet : frais.trajet;
        frais.km = req.body.km ? req.body.km : frais.km;
        frais.hbg = req.body.hbg ? req.body.hbg : frais.hbg;
        frais.repas = req.body.repas ? req.body.repas : frais.repas;
        frais.peage = req.body.peage ? req.body.peage : frais.peage;
        frais.peageV = req.body.peageV ? req.body.peageV : frais.peageV;
        frais.repasV = req.body.repasV ? req.body.repasV : frais.repasV;
        frais.hbgV = req.body.hbgV ? req.body.hbgV : frais.hbgV;
        frais.kmV = req.body.kmV ? req.body.kmV : frais.kmV;
        frais.trajetV = req.body.trajetV ? req.body.trajetV : frais.trajetV;
        frais.adherents = req.body.adherents
          ? req.body.adherents
          : frais.adherents;
        frais.motifs = req.body.motifs ? req.body.motifs : frais.motifs;
        frais.tresories = req.body.tresories
          ? req.body.tresories
          : frais.tresories;

        frais.save(function(err, frais) {
          if (err) {
            return res.status(500).json({
              message: "Error when updating frais.",
              error: err
            });
          }

          return res.json(frais);
        });
      }
    );
  },

  /**
   * fraisController.remove()
   */
  remove: function(req, res) {
    var id = req.params.id;
    fraisModel.findByIdAndRemove(id, function(err, frais) {
      if (err) {
        return res.status(500).json({
          message: "Error when deleting the frais.",
          error: err
        });
      }
      return res.status(204).json();
    });
  }
};
