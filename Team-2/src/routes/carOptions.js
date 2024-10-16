const express = require("express");
const carOptionsController = require("../controllers/carOptionsController");
const carOptionsValidation = require("../middlewares/carOptionsValidation");

const router = express.Router();

router
  .route("/")
  .get(carOptionsValidation.validateGetcarOptions, carOptionsController.getcarOptions)
  .post(
    carOptionsValidation.validateCreatecarOptions,
    carOptionsController.createcarOptions
  );

router
  .route("/:id")
  .get(
    carOptionsValidation.validateGetcarOptionsById,
    carOptionsController.getcarOptionsById
  )
  .put(carOptionsValidation.validateUpdatecarOptions, carOptionsController.updatecarOptions)
  .delete(
    carOptionsValidation.validateDeletecarOptionsById,
    carOptionsController.deletecarOptionsById
  );

module.exports = router;
