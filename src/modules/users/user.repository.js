import User from "./user.model.js";

const create = async (data) => {
  return User.create(data);
};

const findByEmail = async (email) => {
  return User.findOne({ email })
    .select("+password");
};

const findById = async (id) => {
  return User.findById(id);
};

export default {
  create,
  findByEmail,
  findById,
};