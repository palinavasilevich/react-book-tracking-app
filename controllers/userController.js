const { prisma } = require("../prisma/prisma-client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateJwt = ({ id }) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

/**
 * @route   POST api/user/register
 * @desc    Register user
 * @access  public
 */
const register = async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ message: "Fill in all required fields" });
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: `User with email ${email} already exist` });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      id: user.id,
      email: user.email,
      name,
      token: generateJwt({ id: user.id }),
    });
  } catch (error) {
    console.error("Failed to create new user", error);
    res.status(500).json({ message: "Internal server error" });
  }

  res.send({ email, password, name });
};

/**
 * @route   POST api/user/login
 * @desc    Login user
 * @access  public
 */
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Fill in all required fields" });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "Wrong login or password" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({ message: "Wrong login or password" });
    }

    res.json({
      id: user.id,
      email: user.email,
      name: user.name,
      token: generateJwt({ id: user.id }),
    });
  } catch (error) {
    console.error("Login error", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * @route   GET api/user/current
 * @desc    Get current user
 * @access  private
 */
const current = async (req, res) => {
  return res.status(200).json(req.user);
};

module.exports = {
  login,
  register,
  current,
};
