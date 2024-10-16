const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");

const prisma = new PrismaClient();

exports.getOptions = async (option_name) => {
  let query = {
    include: {
      Cars_Option: true,
    },
  };

  let orQuery = [];

  if (option_name) {
    orQuery.push({
      option_name: { contains: option_name, mode: "insensitive" },
    });
  }
  if (orQuery.length > 0) {
    query.where = {
      ...query.where,
      OR: orQuery,
    };
  }

  const searchedOptions = await prisma.options.findMany(query);
  const serializedOptions = JSONBigInt.stringify(searchedOptions);
  return JSONBigInt.parse(serializedOptions);
};

exports.getOptionsById = async (id) => {
  const searchedOptionsById = await prisma.options.findUnique({
    where: { id: Number(id) },
  });

  const serializedOptions = JSONBigInt.stringify(searchedOptionsById);
  return JSONBigInt.parse(serializedOptions);
};

exports.createOptions = async (data) => {
  const newOption = await prisma.options.create({
    include: {
      Cars_Option: {
        include: {
          Models: true,
          Options: true,
        },
      },
    },
    data,
  });

  const serializedOptions = JSONBigInt.stringify(newOption);
  return JSONBigInt.parse(serializedOptions);
};

exports.updateOptions = async (id, data) => {
  const updatedOptions = await prisma.options.update({
    where: {
      id: Number(id),
    },
    include: {
      Cars_Option: true,
    },
    data,
  });

  const serializedOptions = JSONBigInt.stringify(updatedOptions);
  return JSONBigInt.parse(serializedOptions);
};

exports.deleteOptionsById = async (id) => {
  const deletedOption = await prisma.options.delete({
    where: {
      id: Number(id),
    },
    include: {
      Cars_Option: true,
    },
  });
  const serializedOptions = JSONBigInt.stringify(deletedOption);
  return JSONBigInt.parse(serializedOptions);
};
