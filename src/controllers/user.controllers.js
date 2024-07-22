import mongoose from "mongoose";
import {
  createService,
  findAllUsersService,
  findUserByIdService,
  updateUserService,
} from "../services/user.service.js";

export const create = async (req, res) => {
  try {
    const { name, username, email, password, avatar, background } = req.body;
    if (!name || !username || !email || !password || !avatar || !background) {
      return res.status(400).send({ message: "Submit all fields for registration" });
    }
    const user = await createService(req.body);
    if (!user) {
      return res.status(400).send({ message: "Error creating User" });
    }
    return res.status(201).send({
      message: "User created successfully",
      user: {
        id: user._id,
        name,
        username,
        email,
        avatar,
        background,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
};
export const findAllUsers = async (req, res) => {
  try {
    const users = await findAllUsersService();

    if (!Array.isArray(users)) {
      return res.status(500).send({ message: "Error retrieving users." });
    }

    if (users.length === 0) {
      return res
        .status(400)
        .send({ message: "There are no registered users." });
    }

    return res.send(users);
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
};
export const findUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await findUserByIdService(id);
    return res.status(200).send(user);
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
};
export const updateUser = async (req, res) => {
  const { name, username, email, password, avatar, background } = req.body;
  if (!name && !username && !email && !password && !avatar && !background) {
    return res
      .status(400)
      .send({ message: "Submit at least one field for update" });
  }
  const id = req.params.id;
  const updatedFields = { name, username, email, password, avatar, background };

  try {
    const updatedUser = await updateUserService(id, updatedFields);
    return res
      .status(200)
      .send({ message: "User successfully updated", user: updatedUser });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error updating user", error: error.message });
  }
};
