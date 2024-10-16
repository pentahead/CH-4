const carOptionsRepository = require("../repositories/carOptionsRepository");
const {
  NotFoundError,
  BadRequestError,
  InternalServerError,
} = require("../utils/request");

exports.getcarOptions = async (model_id) => {
  const carOptions = await carOptionsRepository.getcarOptions(model_id);
  if (!carOptions.length) {
    throw new NotFoundError("No Car Options found with the provided criteria");
  }
  return carOptions;
};

exports.getcarOptionsById = async (id) => {
  const data = await carOptionsRepository.getcarOptionsById(id);
  if (!data) {
    throw new NotFoundError("Option is Not Found!");
  }
  return data;
};

exports.createcarOptions = async (data) => {
  return carOptionsRepository.createcarOptions(data);
};

exports.updatecarOptions = async (id, data) => {
  const existingcarOptions = await carOptionsRepository.getcarOptionsById(id);
  if (!existingcarOptions) {
    throw new NotFoundError("carOptions is Not Found!");
  }

  data = {
    ...existingcarOptions,
    ...data,
  };

  const updatedcarOptions = await carOptionsRepository.updatecarOptions(id, data);
  if (!updatedcarOptions) {
    throw new InternalServerError(["Failed to update Car Options!"]);
  }
  return updatedcarOptions;
};

exports.deletecarOptionsById = async (id) => {
  const existingcarOptions = await carOptionsRepository.getcarOptionsById(id);
  if (!existingcarOptions) {
    throw new NotFoundError("Car Option is Not Found!");
  }

  const deletedOption = await carOptionsRepository.deletecarOptionsById(id);
  if (!deletedOption) {
    throw new InternalServerError(["Failed to delete Car Option!"]);
  }
};
