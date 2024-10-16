const express = require('express');
const carRouter = require("./cars");
const optionsRouter = require("./options");
const carOptionsRouter = require("./carOptions");

const router = express.Router();

router.use("/cars", carRouter);
router.use("/options", optionsRouter);
router.use("/carOptions", carOptionsRouter);
module.exports = router;