const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");
const { NotFoundError } = require("../utils/request");
const { number } = require("zod");

const prisma = new PrismaClient();

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
  let query = {
    include: {
      Models: {
        include: {
          Transmission: true,
          Manufacture: true,
          Type: true,
        },
      },
      Available: true,
    },
  };

  let andQuery = [];

  if (model_name) {
    andQuery.push({
      Models: {
        model_name: { contains: model_name, mode: "insensitive" },
      },
    });
  }

  if (manufacture_name) {
    andQuery.push({
      Models: {
        Manufacture: {
          manufacture_name: { contains: manufacture_name, mode: "insensitive" },
        },
      },
    });
  }

  if (year) {
    andQuery.push({ year: Number(year) });
  }

  if (plate) {
    andQuery.push({ plate: { contains: plate, mode: "insensitive" } });
  }

  if (rentPerDay) {
    andQuery.push({ rentPerDay: Number(rentPerDay) });
  }

  if (capacity) {
    andQuery.push({ Models: { capacity: Number(capacity) } });
  }

  if (transmission_name) {
    andQuery.push({
      Models: {
        Transmission: {
          transmission_name: {
            contains: transmission_name,
            mode: "insensitive",
          },
        },
      },
    });
  }

  if (type_name) {
    andQuery.push({
      Models: {
        Type: {
          type_name: { contains: type_name, mode: "insensitive" },
        },
      },
    });
  }

  if (available_status) {
    andQuery.push({
      Available: {
        available_status: { contains: available_status, mode: "insensitive" },
      },
    });
  }

  if (andQuery.length > 0) {
    query.where = {
      AND: andQuery,
    };
  }

  const searchedCars = await prisma.cars.findMany(query);

  const serializedCars = JSONBigInt.stringify(searchedCars);
  return JSONBigInt.parse(serializedCars);
};

exports.getCarById = async (id) => {
  const searchedCarsById = await prisma.cars.findUnique({
    where: { id: Number(id) },
  });

  const serializedCars = JSONBigInt.stringify(searchedCarsById);
  return JSONBigInt.parse(serializedCars);
};

exports.createCar = async (data) => {
  const newCar = await prisma.cars.create({
    include: {
      Models: {
        include: {
          Transmission: true,
          Manufacture: true,
          Type: true,
        },
      },
      Available: true,
    },
    data,
  });

  const serializedCars = JSONBigInt.stringify(newCar);
  return JSONBigInt.parse(serializedCars);
};

exports.updateCarById = async (id, data) => {
  const updatedCar = await prisma.cars.update({
    where: {
      id: Number(id),
    },
    include: {
      Models: {
        include: {
          Transmission: true,
          Manufacture: true,
          Type: true,
        },
      },
      Available: true,
    },
    data: data,
  });

  const serializedOptions = JSONBigInt.stringify(updatedCar);
  return JSONBigInt.parse(serializedOptions);
};

exports.deleteCarById = async (id) => {
  const deletedCar = await prisma.cars.delete({
    where: {
      id: Number(id),
    },
    include: {
      Models: {
        include: {
          Transmission: true,
          Manufacture: true,
          Type: true,
        },
      },
      Available: true,
    },
  });
  const serializedOptions = JSONBigInt.stringify(deletedCar);
  return JSONBigInt.parse(serializedOptions);
};
