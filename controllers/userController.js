const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/index");

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

class UserController {
  async registration(req, res, next) {
    try {
      const { email, password, role } = req.body;
      const user = await User.findOne({ where: { email } });
      if (user) {
        return res.status(400).json({
          message: "User with this email already exists",
        });
      }
      const hash = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        email,
        password: hash,
        role,
      });
      const token = generateJwt(newUser.id, newUser.email, newUser.role);
      return res.status(201).json({
        message: "User created successfully",
        token,
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("User not found");
      }
      const isValid = bcrypt.compareSync(password, user.password);
      if (!isValid) {
        throw new Error("Password is not valid");
      }
      const token = generateJwt(user.id, user.email, user.role);
      res
        .status(200)
        .cookie("token", token, {
          httpOnly: true,
          maxAge: 3600 * 1000,
        })
        .json({
          message: "Login successfully",
          token,
          user,
        });
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      res.clearCookie("token");
      res.status(200).json({ message: "Logout successfully" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
