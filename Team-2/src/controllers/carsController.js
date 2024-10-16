const carsService = require("../services/carsService");
const { successResponse } = require("../utils/response");

exports.getCars = async (req, res, next) => {
  const data = await carsService.getCars(
    req.query?.model_name,
    req.query?.manufacture_name,
    req.query?.year,
    req.query?.plate,
    req.query?.rentPerDay,
    req.query?.capacity,
    req.query?.transmission_name,
    req.query?.type_name,
    req.query?.available_status
  );
  successResponse(res, data);
};

exports.getCarById = async (req, res, next) => {
  const data = await carsService.getCarById(req.params.id);
  successResponse(res, data);
};

exports.createCar = async (req, res, next) => {
  const data = await carsService.createCar(req.body);
  successResponse(res, data);
};

exports.updateCarById = async (req, res, next) => {
  const { id } = req.params;
  const data = await carsService.updateCarById(id, req.body);
  successResponse(res, data);
};

exports.deleteCarById = async (req, res, next) => {
  const data = await carsService.deleteCarById(req.params.id);
  successResponse(res, data);
}
