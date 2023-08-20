const AppError = require("../utils/App.error");

class UserController {
  create(request, response) {
    const { name, email, password } = request.body;

    if (!name) {
      throw new AppError("Name is missing");
    }

    response.status(201).json({ name, email, password });
  }
}

module.exports = UserController;
