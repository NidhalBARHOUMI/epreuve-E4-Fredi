var motifsModel = require('../models/motifsModel.js');

/**
 * motifsController.js
 *
 * @description :: Server-side logic for managing motifss.
 */
module.exports = {

    /**
     * motifsController.list()
     */
    list: function (req, res) {
        motifsModel.find(function (err, motifss) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting motifs.',
                    error: err
                });
            }
            return res.json(motifss);
        });
    },

    /**
     * motifsController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        motifsModel.findOne({_id: id}, function (err, motifs) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting motifs.',
                    error: err
                });
            }
            if (!motifs) {
                return res.status(404).json({
                    message: 'No such motifs'
                });
            }
            return res.json(motifs);
        });
    },

    /**
     * motifsController.create()
     */
    create: function (req, res) {
        var motifs = new motifsModel({
			libelle : req.body.libelle

        });

        motifs.save(function (err, motifs) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating motifs',
                    error: err
                });
            }
            return res.status(201).json(motifs);
        });
    },

    /**
     * motifsController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        motifsModel.findOne({_id: id}, function (err, motifs) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting motifs',
                    error: err
                });
            }
            if (!motifs) {
                return res.status(404).json({
                    message: 'No such motifs'
                });
            }

            motifs.libelle = req.body.libelle ? req.body.libelle : motifs.libelle;
			
            motifs.save(function (err, motifs) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating motifs.',
                        error: err
                    });
                }

                return res.json(motifs);
            });
        });
    },

    /**
     * motifsController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        motifsModel.findByIdAndRemove(id, function (err, motifs) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the motifs.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
