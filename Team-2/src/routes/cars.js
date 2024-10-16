const express = require("express");
const carsController = require("../controllers/carsController");
const carsValidation = require("../middlewares/carsValidation");

const router = express.Router();

router
  .route("/")
  .get(carsValidation.validateGetCars, carsController.getCars)
  .post(carsValidation.validateCreateCar, carsController.createCar);
router
  .route("/:id")
  .get(carsValidation.validateGetCarById, carsController.getCarById)
  .put(carsValidation.validateUpdateCarById, carsController.updateCarById)
  .delete(carsValidation.validateDeleteCarById, carsController.deleteCarById);

module.exports = router;
