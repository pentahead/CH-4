const optionsService = require("../services/optionsService");
const { successResponse } = require("../utils/response");

exports.getOptions = async (req, res, next) => {
  const data = await optionsService.getOptions(req.query?.option_name);
  successResponse(res, data);
};

exports.getOptionsById = async (req, res, next) => {
  const data = await optionsService.getOptionsById(req.params.id);
  successResponse(res, data);
};

exports.createOptions = async (req, res, next) => {
  const data = await optionsService.createOptions(req.body);
  successResponse(res, data);
};

exports.updateOptions = async (req, res, next) => {
  const { id } = req.params;
  const data = await optionsService.updateOptions(id, req.body);
  successResponse(res, data);
};

exports.deleteOptionsById = async (req, res, next) => {
  const data = await optionsService.deleteOptionsById(req.params.id);
  successResponse(res, data);
};
