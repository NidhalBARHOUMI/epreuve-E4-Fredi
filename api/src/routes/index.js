const adherents = require("./adherentsRoutes");
const cerfa = require("./cerfaRoutes");
const frais = require("./fraisRoutes");
const ligueSportive = require("./ligueSportiveRoutes");
const motifs = require("./motifsRoutes");
const tresoriers = require("./tresoriersRoutes");
const router = require("express").Router();

router.use('/adherents',adherents)
router.use('/cerfa',cerfa)
router.use('/frais',frais)
router.use('/ligueSportive',ligueSportive)
router.use('/motifs',motifs)
router.use('/tresoriers',tresoriers)

module.exports=router;

