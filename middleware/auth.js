const jwt = require("jsonwebtoken");
const { prisma } = require("../prisma/prisma-client");

const auth = async (req, res, next) => {
  try {
    const authHeaders = req.headers["authorization"];

    const token = authHeaders && authHeaders.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "No authorization" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "No authorization" });
  }
};

module.exports = { auth };
