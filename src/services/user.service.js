import { User } from "../models/User.js";

export const createService = (body) => User.create(body);
export const findAllUsersService = () => User.find();
export const findUserByIdService = (id) => User.findOne({ _id: id });
export const updateUserService = (id, updateFields) => {
  return User.findOneAndUpdate(
    { _id: id },
    { $set: updateFields },
    { new: true },
  );
};

