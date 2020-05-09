var tresoriersModel = require('../models/tresoriersModel.js');
var bcrypt = require('bcrypt');
const sgMail = require('@sendgrid/mail');

/**
 * tresoriersController.js
 *
 * @description :: Server-side logic for managing tresorierss.
 */
module.exports = {

  /**
   * tresoriersController.list()
   */
  list: function (req, res) {
    tresoriersModel.find(function (err, tresorierss) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting tresoriers.',
          error: err
        });
      }
      return res.json(tresorierss);
    });
  },

  /**
   * tresoriersController.show()
   */
  show: function (req, res) {
    var id = req.params.id;
    tresoriersModel.findOne({
      _id: id
    }, function (err, tresoriers) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting tresoriers.',
          error: err
        });
      }
      if (!tresoriers) {
        return res.status(404).json({
          message: 'No such tresoriers'
        });
      }
      return res.json(tresoriers);
    });
  },

  /**
   * tresoriersController.create()
   */
  create: function (req, res) {

    tresoriersModel.findOne({
        email: req.body.email
      })
      .exec()
      .then(tresoriers => {
        if (tresoriers) {
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
              var tresoriers = new tresoriersModel({
                nom: req.body.nom,
                prenom: req.body.prenom,
                num: req.body.num,
                email: req.body.email,
                modePasse: hash,


              });

              tresoriers.save((err, tresoriers) => {
                if (err) {
                  return res.status(500).json({
                    message: 'error when creating tresoriers',
                    error: err
                  })
                }
                sgMail.setApiKey('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')
                const msg = {
                  to: tresoriers.email,
                  from: 'noreply@fredi.com',
                  subject: 'Bienvenue sur FREDI',
                  text: 'votre mode passe est : ' + req.body.password,

                };
                sgMail.send(msg);
                return res.status(201).json(tresoriers)
              })
            }
          })
        }
      })


  },

  signin: (req, res) => {
    tresoriersModel.findOne({
        email: req.body.email
      }).exec()
      .then(tresoriers => {
        if (!tresoriers) {
          return res.status(401).json({
            message: 'authontification failed'
          })
        }
        bcrypt.compare(req.body.password, tresoriers.modePasse, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: 'authontification failed'
            })
          }
          if (result) {
            return res.status(200).json({
              message: 'authontification successful',
              tresoriers
            })
          }

          return res.status(401).json({
            message: 'authontification failed'
          })
        })
      })
  },


  /**
   * tresoriersController.update()
   */
  update: function (req, res) {
    var id = req.params.id;
    tresoriersModel.findOne({
      _id: id
    }, function (err, tresoriers) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting tresoriers',
          error: err
        });
      }
      if (!tresoriers) {
        return res.status(404).json({
          message: 'No such tresoriers'
        });
      }

      tresoriers.nom = req.body.nom ? req.body.nom : tresoriers.nom;
      tresoriers.prenom = req.body.prenom ? req.body.prenom : tresoriers.prenom;
      tresoriers.num = req.body.num ? req.body.num : tresoriers.num;
      tresoriers.email = req.body.email ? req.body.email : tresoriers.email;
      tresoriers.modePasse = req.body.modePasse ? req.body.modePasse : tresoriers.modePasse;

      tresoriers.save(function (err, tresoriers) {
        if (err) {
          return res.status(500).json({
            message: 'Error when updating tresoriers.',
            error: err
          });
        }

        return res.json(tresoriers);
      });
    });
  },

  /**
   * tresoriersController.remove()
   */
  remove: function (req, res) {
    var id = req.params.id;
    tresoriersModel.findByIdAndRemove(id, function (err, tresoriers) {
      if (err) {
        return res.status(500).json({
          message: 'Error when deleting the tresoriers.',
          error: err
        });
      }
      return res.status(204).json();
    });
  },

  /**
   * tresoriersController.()
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