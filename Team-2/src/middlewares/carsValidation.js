const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

exports.validateGetCars = (req, res, next) => {
  const validateQuery = z.object({
    model_name: z.string().optional(),
    manufacture_name: z.string().optional(),
    year: z.coerce.number().optional(),
    plate: z.string().optional(),
    rentPerDay: z.coerce.number().optional(),
    capacity: z.coerce.number().optional(),
    transmission_name: z.string().optional(),
    type_name: z.string().optional(),
    available_status: z.string().optional(),
  });

  const resultValidateQuery = validateQuery.safeParse(req.query);
  if (!resultValidateQuery.success) {
    throw new BadRequestError(resultValidateQuery.error.errors);
  }
  next();
};

exports.validateGetCarById = (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });

  const resultValidateParams = validateParams.safeParse(req.params);
  if (!resultValidateParams.success) {
    throw new BadRequestError(resultValidateParams.error.errors);
  }

  next();
};

exports.validateCreateCar = (req, res, next) => {
  console.log(req.body);
  const validateBody = z.object({
    plate: z.string(),
    rentPerDay: z.number(),
    description: z.string(),
    year: z.number(),
    image: z.string(),
    model_name: z.string(),
    capacity: z.number(),
    transmission_name: z.string(),
    manufacture_name: z.string(),
    manufacture_region: z.string(),
    year_establish: z.number(),
    type_name: z.string(),
    available_status: z.string(),
  });

  const resultValidateBody = validateBody.safeParse(req.body);
  if (!resultValidateBody.success) {
    throw new BadRequestError(resultValidateBody.error.errors);
  }
  next();
};
