const AppError = require("../utils/AppError");
const knex = require("../database");
const { hash } = require("bcrypt");

class UserController {
  async create(request, response) {
    const { name, email, password, avatar } = request.body;

    const checkUserExists = await knex("users").where({ email }).first();

    if (checkUserExists) {
      throw new AppError("E-mail já está em uso");
    }

    const hashedPassword = await hash(password, 10);

    await knex("users").insert({
      name,
      email,
      password: hashedPassword,
      avatar,
    });

    response.status(201).json();
  }
}

module.exports = UserController;
