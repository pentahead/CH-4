const carsRepository = require("../repositories/carsRepository");
const {
  NotFoundError,
  InternalServerError,
  BadRequestError,
} = require("../utils/request");

exports.getCars = async (
  model_name,
  manufacture_name,
  year,
  plate,
  rentPerDay,
  capacity,
  transmission_name,
  type_name,
  available_status
) => {
  const cars = await carsRepository.getCars(
    model_name,
    manufacture_name,
    year,
    plate,
    rentPerDay,
    capacity,
    transmission_name,
    type_name,
    available_status
  );
  if (!cars.length) {
    throw new NotFoundError("No cars found with the provided criteria.");
  }
  return cars;
};

exports.getCarById = async (id) => {
  const data = await carsRepository.getCarById(id);
  if (!data) {
    throw new NotFoundError("Car is Not Found!");
  }
  return data;
};

exports.createCar = async (data) => {
  const newCar = await carsRepository.createCar(data);
  if (!newCar) {
    throw new BadRequestError("Failed to create new car");
  }
  return newCar;
};
