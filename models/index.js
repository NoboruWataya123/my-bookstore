const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, allowNull: false, defaultValue: "USER" },
});

const Book = sequelize.define("book", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  author: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  img: { type: DataTypes.STRING, allowNull: false },
  isbn: { type: DataTypes.STRING, allowNull: true },
  userId: { type: DataTypes.INTEGER, allowNull: true },
});

const Genre = sequelize.define("genre", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  bookId: { type: DataTypes.INTEGER, allowNull: false },
});

const BookGenre = sequelize.define("book_genre", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  bookId: { type: DataTypes.INTEGER, allowNull: false },
  genreId: { type: DataTypes.INTEGER, allowNull: false },
});

User.hasMany(Book, { foreignKey: "userId" });
Book.belongsTo(User, { foreignKey: "userId" });

Book.belongsToMany(Genre, { through: BookGenre, foreignKey: "bookId" });
Genre.belongsToMany(Book, { through: BookGenre, foreignKey: "genreId" });

module.exports = {
  User,
  Book,
  Genre,
  BookGenre,
};
