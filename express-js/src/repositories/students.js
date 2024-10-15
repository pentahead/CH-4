const fs = require("fs");
const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");
const students = require("../../data/students.json");

const prisma = new PrismaClient();

exports.getStudents = async (name, nickName) => {
  // Define query here
  let query = {
    include: {
      classes: true,
      universities: true,
    },
  };

  // It will generate the query
  let orQuery = [];
  if (name) {
    orQuery.push({
      name: { contains: name, mode: "insensitive" },
    });
  }
  if (nickName) {
    orQuery.push({
      nick_name: { contains: nickName, mode: "insensitive" },
    });
  }
  if (orQuery.length > 0) {
    query.where = {
      ...query.where,
      OR: orQuery,
    };
  }
  const searchedStudents = await prisma.students.findMany(query);
  // Convert BigInt fields to string for safe serialization
  const serializedStudents = JSONBigInt.stringify(searchedStudents);
  return JSONBigInt.parse(serializedStudents);
};

exports.getStudentById = async (id) => {
  const student = await prisma.students.findUnique({ where: { id: id } });

  // Convert BigInt fields to string for safe serialization
  const serializedStudents = JSONBigInt.stringify(student);
  return JSONBigInt.parse(serializedStudents);
};

exports.createStudent = async (data) => {
  const newStudent = await prisma.students.create({
    data: {
      name: data.name,
      nick_name: data.nick_name,
      class_id: data.class_id,
      university_id: data.university_id,
      profile_picture: data.profile_picture,
    },
  });

  const serializedStudents = JSONBigInt.stringify(newStudent);
  return JSONBigInt.parse(serializedStudents);
};

exports.updateStudent = async (id, data) => {
  const updatedStudent = await prisma.students.update({
    where: {
      id: id,
    },
    data: {
      name: data.name,
      nick_name: data.nick_name,
      class_id: data.class_id,
      university_id: data.university_id,
      profile_picture: data.profile_picture,
    },
  });
  const serializedStudents = JSONBigInt.stringify(updatedStudent);
  return JSONBigInt.parse(serializedStudents);
};

exports.deleteStudentById = async (id) => {
  const deletedStudent = await prisma.students.delete({
    where: { id: id },
  });

  const serializedStudents = JSONBigInt.stringify(deletedStudent);
  return JSONBigInt.parse(serializedStudents);
};
