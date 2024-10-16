const carOptionsService = require("../services/carOptionsService");
const { successResponse } = require("../utils/response");

exports.getcarOptions = async (req, res, next) => {
  const data = await carOptionsService.getcarOptions(req.query?.option_name);
  successResponse(res, data);
};

exports.getcarOptionsById = async (req, res, next) => {
  const data = await carOptionsService.getcarOptionsById(req.params.id);
  successResponse(res, data);
};

exports.createcarOptions = async (req, res, next) => {
  const data = await carOptionsService.createcarOptions(req.body);
  successResponse(res, data);
};

exports.updatecarOptions = async (req, res, next) => {
  const { id } = req.params;
  const data = await carOptionsService.updatecarOptions(id, req.body);
  successResponse(res, data);
};

exports.deletecarOptionsById = async (req, res, next) => {
  const data = await carOptionsService.deletecarOptionsById(req.params.id);
  successResponse(res, data);
};
