const optionsRepository = require("../repositories/optionsRepository");
const {
  NotFoundError,
  BadRequestError,
  InternalServerError,
} = require("../utils/request");

exports.getOptions = async (option_name) => {
  const options = await optionsRepository.getOptions(option_name);
  if (!options.length) {
    throw new NotFoundError("No options found with the provided criteria");
  }
  return options;
};

exports.getOptionsById = async (id) => {
  const data = await optionsRepository.getOptionsById(id);
  if (!data) {
    throw new NotFoundError("Option is Not Found!");
  }
  return data;
};

exports.createOptions = async (data) => {
  return optionsRepository.createOptions(data);
};

exports.updateOptions = async (id, data) => {
  const existingOptions = await optionsRepository.getOptionsById(id);
  if (!existingOptions) {
    throw new NotFoundError("Options is Not Found!");
  }

  data = {
    ...existingOptions,
    ...data,
  };

  const updatedOptions = await optionsRepository.updateOptions(id, data);
  if (!updatedOptions) {
    throw new InternalServerError(["Failed to update Options!"]);
  }
  return updatedOptions;
};

exports.deleteOptionsById = async (id) => {
  const existingOptions = await optionsRepository.getOptionsById(id);
  if (!existingOptions) {
    throw new NotFoundError("Option is Not Found!");
  }

  const deletedOption = await optionsRepository.deleteOptionsById(id);
  if (!deletedOption) {
    throw new InternalServerError(["Failed to delete Option!"]);
  }
  return deletedOption;
};
