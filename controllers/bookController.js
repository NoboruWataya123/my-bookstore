const uuid = require("uuid");
const path = require("path");
const { Book } = require("../models/index");

class BookController {
  async create(req, res) {
    const { title, author, description, isbn } = req.body;
    const { img } = req.files;
    let fileName = uuid.v4() + ".jpg";
    img.mv(path.resolve(__dirname, "..", "static", fileName));
    const book = await Book.create({
      title,
      author,
      description,
      img: fileName,
      isbn,
    });
    res.json(book);
  }

  async getAll(req, res) {
    const books = await Book.findAll();
    res.json(books);
  }

  async getOne(req, res) {
    const book = await Book.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(book);
  }

  async update(req, res) {
    const { title, author, description, isbn } = req.body;
    const { img } = req.files;
    let fileName = uuid.v4() + ".jpg";
    img.mv(path.resolve(__dirname, "..", "static", fileName));
    const book = await Book.update(
      {
        title,
        author,
        description,
        img: fileName,
        isbn,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.json(book);
  }

  async delete(req, res, next) {
    try {
      const deleteBook = await Book.findOne({
        where: {
          id: req.params.id,
        },
      });
      await deleteBook.destroy();
      res.json(deleteBook);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new BookController();
