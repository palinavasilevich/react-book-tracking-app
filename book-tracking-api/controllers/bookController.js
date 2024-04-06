const { prisma } = require("../prisma/prisma-client");

/**
 * @route POST api/books
 * @desc Create new book
 * @access private
 */

const createBook = async (req, res) => {
  try {
    const { title, author, img, rating, readDate } = req.body;

    if (!title || !author) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const book = await prisma.book.create({
      data: {
        title,
        author,
        img: img ? img : "",
        rating,
        readDate,
        userId: req.user.id,
      },
    });

    return res.status(201).json(book);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create new book" });
  }
};

/**
 * @route GET api/books
 * @desc Get all books
 * @access private
 */
const getAllBooks = async (req, res) => {
  try {
    const books = await prisma.book.findMany();
    res.json(books);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get all books" });
  }
};

/**
 * @route DELETE api/books/:id
 * @desc Delete book
 * @access private
 */
const deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.book.delete({
      where: { id },
    });

    res.status(204).json({ message: "The book was successfully deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to delete book" });
  }
};

/**
 * @route PUT api/books/:id
 * @desc Update book
 * @access private
 */
const updateBook = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  console.log(data);

  try {
    await prisma.book.update({
      where: { id },
      data,
    });

    res.status(204).json({ message: "The book has been successfully updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update book" });
  }
};

/**
 * @route GET api/books/:id
 * @desc Get book by id
 * @access private
 */

const getBookById = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await prisma.book.findUnique({ where: { id } });

    if (!book) {
      return res
        .status(400)
        .json({ message: `The book with id ${id} not found` });
    }

    res.json(book);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to receive book" });
  }
};

module.exports = {
  getAllBooks,
  createBook,
  deleteBook,
  updateBook,
  getBookById,
};
