const AppError = require("../utils/App.error");
const knex = require("../database");
const { hash, compare } = require("bcrypt");

class UserController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const checkUserExists = await knex("users").where({ email }).first();

    if (checkUserExists) {
      throw new AppError("E-mail já está em uso");
    }

    const hashedPassword = await hash(password, 10);

    await knex("users").insert({
      name,
      email,
      password: hashedPassword,
    });

    response.status(201).json();
  }
}

module.exports = UserController;
