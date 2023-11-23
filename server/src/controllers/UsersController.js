const AppError = require("../utils/AppError");
const knex = require("../database");

const { hash, compare } = require("bcrypt");

class UserController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const userExists = await knex("users").where({ email }).first();

    if (userExists) {
      throw new AppError("Email already registered");
    }

    const hashedPassword = await hash(password, 10);

    await knex("users").insert({
      name,
      email,
      password: hashedPassword,
    });

    response.status(201).json();
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const user_id = request.user.id;

    const user = await knex("users").where({ id: user_id }).first();

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const userWithUpdatedEmail = await knex("users").where({ email }).first();

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("Email already registered");
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (password && !old_password) {
      throw new AppError("Old password not informed");
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError("Password do not match");
      }

      user.password = await hash(password, 8);
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (password) updateData.password = user.password;

    await knex("users").where({ id: user_id }).update(updateData);

    response.status(200).json();
  }
}

module.exports = UserController;
