const { prisma } = require("../prisma/prisma-client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    return res.status(201).json({
      id: user.id,
      email: user.email,
      name,
      token: jwt.sign({ userId: user.id }, secretKey, { expiresIn: "24h" }),
    });
  } catch (error) {
    console.error("Failed to create new user", error);
    res.status(500).json({ error: "Internal server error" });
  }

  res.send({ email, password, name });
};

module.exports = {
  login,
  register,
  current,
};
