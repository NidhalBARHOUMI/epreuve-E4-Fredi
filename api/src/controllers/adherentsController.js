var adherentsModel = require('../models/adherentsModel.js');
var bcrypt = require('bcrypt');
const sgMail = require('@sendgrid/mail');

/**
 * adherentsController.js
 *
 * @description :: Server-side logic for managing adherentss.
 */
module.exports = {

  /**
   * adherentsController.list()
   */
  list: function (req, res) {
    adherentsModel.find(function (err, adherentss) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting adherents.',
          error: err
        });
      }
      return res.json(adherentss);
    });
  },

  /**
   * adherentsController.show()
   */
  show: function (req, res) {
    var id = req.params.id;
    adherentsModel.findOne({
      _id: id
    }, function (err, adherents) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting adherents.',
          error: err
        });
      }
      if (!adherents) {
        return res.status(404).json({
          message: 'No such adherents'
        });
      }
      return res.json(adherents);
    });
  },

  /**
   * adherentsController.show()
   */
  filter: function (req, res) {
    var filters;
    if (req.body.q) {
      var q = req.body.q;
      const regex = new RegExp(`.*${q}.*`, 'i');
      filters = {
        $or: [{
            'nom': regex
          },
          {
            'prenom': regex
          }
        ]
      }

    }

    adherentsModel.find(
      filters,
      function (err, adherents) {
        if (err) {
          return res.status(500).json({
            message: 'Error when getting adherents.',
            error: err
          });
        }
        if (!adherents) {
          return res.status(404).json({
            message: 'No such adherents'
          });
        }
        return res.json(adherents);
      });
  },

  /**
   * adherentsController.create()
   */
  create: function (req, res) {

    adherentsModel.findOne({
        email: req.body.email
      })
      .exec()
      .then(adherents => {
        if (adherents) {
          return res.status(409).json({
            message: 'email exists'

          })

        } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({
                error: err
              })
            } else {
              var adherents = new adherentsModel({
                nom: req.body.nom,
                prenom: req.body.prenom,
                sexe: req.body.sexe,
                date: req.body.date,
                adresse: req.body.adresse,
                ville: req.body.ville,
                codePostal: req.body.codePostal,
                num: req.body.num,
                email: req.body.email,
                modePasse: hash,
                ligueSportive: req.body.ligueSportive

              });

              adherents.save((err, adherents) => {
                if (err) {
                  return res.status(500).json({
                    message: 'error when creating adherents',
                    error: err
                  })
                }
                sgMail.setApiKey('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')
                const msg = {
                  to: adherents.email,
                  from: 'noreply@fredi.com',
                  subject: 'Bienvenue sur FREDI',
                  text: 'votre mode passe est : ' + req.body.password,

                };
                sgMail.send(msg);
                return res.status(201).json(adherents)
              })
            }
          })
        }
      })


  },

  signin: (req, res) => {
    adherentsModel.findOne({
        email: req.body.email
      }).exec()
      .then(adherents => {
        if (!adherents) {
          return res.status(401).json({
            message: 'authontification failed'
          })
        }
        bcrypt.compare(req.body.password, adherents.modePasse, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: 'authontification failed'
            })
          }
          if (result) {
            return res.status(200).json({
              message: 'authontification successful',
              adherents
            })
          }

          return res.status(401).json({
            message: 'authontification failed'
          })
        })
      })
  },

  /**
   * adherentsController.update()
   */
  update: function (req, res) {
    var id = req.params.id;
    adherentsModel.findOne({
      _id: id
    }, function (err, adherents) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting adherents',
          error: err
        });
      }
      if (!adherents) {
        return res.status(404).json({
          message: 'No such adherents'
        });
      }

      adherents.nom = req.body.nom ? req.body.nom : adherents.nom;
      adherents.prenom = req.body.prenom ? req.body.prenom : adherents.prenom;
      adherents.sexe = req.body.sexe ? req.body.sexe : adherents.sexe;
      adherents.date = req.body.date ? req.body.date : adherents.date;
      adherents.adresse = req.body.adresse ? req.body.adresse : adherents.adresse;
      adherents.ville = req.body.ville ? req.body.ville : adherents.ville;
      adherents.codePostal = req.body.codePostal ? req.body.codePostal : adherents.codePostal;
      adherents.num = req.body.num ? req.body.num : adherents.num;
      adherents.email = req.body.email ? req.body.email : adherents.email;
      adherents.modePasse = req.body.modePasse ? req.body.modePasse : adherents.modePasse;
      adherents.ligueSportive = req.body.ligueSportive ? req.body.ligueSportive : adherents.ligueSportive;

      adherents.save(function (err, adherents) {
        if (err) {
          return res.status(500).json({
            message: 'Error when updating adherents.',
            error: err
          });
        }

        return res.json(adherents);
      });
    });
  },

  /**
   * adherentsController.remove()
   */
  remove: function (req, res) {
    var id = req.params.id;
    adherentsModel.findByIdAndRemove(id, function (err, adherents) {
      if (err) {
        return res.status(500).json({
          message: 'Error when deleting the adherents.',
          error: err
        });
      }
      return res.status(204).json();
    });
  },

  /**
   * adherentsController.()
   */
  newPassword: function (req, res) {
    tresoriersModel.findOne({
      num: req.body.num
    }).then((tresoriers) => {
      if (!tresoriers) {
        return res.status(404).json({
          message: 'No such tresoriers'
        });
      }
      bcrypt.hash("changeme", 10, (err, hash) => {
        tresoriers.modePasse = hash;

        tresoriers.save().then((t) => {
          sgMail.setApiKey('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')

          const msg = {
            to: tresoriers.email,
            from: 'noreply@fredi.com',
            subject: 'recuperer mot de passe',
            text: 'votre mode passe est : changeme',
          };
          sgMail.send(msg);
          return res.status(200).json(tresoriers)
        })
      }).catch((err) => res.status(500).json({
        message: 'Error when updating tresoriers.',
        error: err
      }))
    })

  }
};