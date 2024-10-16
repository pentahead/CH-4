const express = require('express');
const carRouter = require("./cars");
const optionsRouter = require("./options")

const router = express.Router();

// router.use("/cars", carRouter);
router.use("/options", optionsRouter);
module.exports = router;