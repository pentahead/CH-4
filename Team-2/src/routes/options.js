const express = require("express");
const optionsController = require("../controllers/optionsController");
const optionsValidation = require("../middlewares/optionsValidation");

const router = express.Router();

router
  .route("/")
  .get(optionsValidation.validateGetOptions, optionsController.getOptions)
  .post(
    optionsValidation.validateCreateOptions,
    optionsController.createOptions
  );

router
  .route("/:id")
  .get(
    optionsValidation.validateGetOptionsById,
    optionsController.getOptionsById
  )
  .put(optionsValidation.validateUpdateOptions, optionsController.updateOptions)
  .delete(
    optionsValidation.validateDeleteOptionsById,
    optionsController.deleteOptionsById
  );

module.exports = router;
