var ligueSportiveModel = require('../models/ligueSportiveModel.js');

/**
 * ligueSportiveController.js
 *
 * @description :: Server-side logic for managing ligueSportives.
 */
module.exports = {

    /**
     * ligueSportiveController.list()
     */
    list: function (req, res) {
        ligueSportiveModel.find(function (err, ligueSportives) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting ligueSportive.',
                    error: err
                });
            }
            return res.json(ligueSportives);
        });
    },

    /**
     * ligueSportiveController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        ligueSportiveModel.findOne({
            _id: id
        }, function (err, ligueSportive) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting ligueSportive.',
                    error: err
                });
            }
            if (!ligueSportive) {
                return res.status(404).json({
                    message: 'No such ligueSportive'
                });
            }
            return res.json(ligueSportive);
        });
    },

    /**
     * ligueSportiveController.create()
     */
    create: function (req, res) {
        var ligueSportive = new ligueSportiveModel({
            nom: req.body.nom

        });

        ligueSportive.save(function (err, ligueSportive) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating ligueSportive',
                    error: err
                });
            }
            return res.status(201).json(ligueSportive);
        });
    },

    /**
     * ligueSportiveController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        ligueSportiveModel.findOne({
            _id: id
        }, function (err, ligueSportive) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting ligueSportive',
                    error: err
                });
            }
            if (!ligueSportive) {
                return res.status(404).json({
                    message: 'No such ligueSportive'
                });
            }

            ligueSportive.nom = req.body.nom ? req.body.nom : ligueSportive.nom;

            ligueSportive.save(function (err, ligueSportive) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating ligueSportive.',
                        error: err
                    });
                }

                return res.json(ligueSportive);
            });
        });
    },

    /**
     * ligueSportiveController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        ligueSportiveModel.findByIdAndRemove(id, function (err, ligueSportive) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the ligueSportive.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};