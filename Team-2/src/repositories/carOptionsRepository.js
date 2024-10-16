const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");

const prisma = new PrismaClient();

exports.getcarOptions = async (model_id) => {
  let query = {
    include: {
      Models: true,
      Options: true,
    },
  };

  let orQuery = [];

  if (model_id) {
    orQuery.push({
      model_id: { contains: model_id, mode: "insensitive" },
    });
  }
  if (orQuery.length > 0) {
    query.where = {
      ...query.where,
      OR: orQuery,
    };
  }

  const searchedcarOptions = await prisma.Cars_Option.findMany(query);
  const serializedcarOptions = JSONBigInt.stringify(searchedcarOptions);
  return JSONBigInt.parse(serializedcarOptions);
};

exports.getcarOptionsById = async (id) => {
  const searchedcarOptionsById = await prisma.Cars_Option.findUnique({
    where: { id: Number(id) },
  });

  const serializedcarOptions = JSONBigInt.stringify(searchedcarOptionsById);
  return JSONBigInt.parse(serializedcarOptions);
};

exports.createcarOptions = async (data) => {
  const newOption = await prisma.Cars_Option.create({
    include: {
      Models: true,
      Options: true,
    },
    data,
  });

  const serializedcarOptions = JSONBigInt.stringify(newOption);
  return JSONBigInt.parse(serializedcarOptions);
};

exports.updatecarOptions = async (id, data) => {
  const updatedcarOptions = await prisma.Cars_Option.update({
    where: {
      id: Number(id),
    },
    include: {
      Models: true,
      Options: true,
    },
    data,
  });

  const serializedcarOptions = JSONBigInt.stringify(updatedcarOptions);
  return JSONBigInt.parse(serializedcarOptions);
};

exports.deletecarOptionsById = async (id) => {
  const deletedOption = await prisma.Cars_Option.delete({
    where: {
      id: Number(id),
    },
    include: {
      Models: true,
      Options: true,
    },
  });
  const serializedcarOptions = JSONBigInt.stringify(deletedOption);
  return JSONBigInt.parse(serializedcarOptions);
};
