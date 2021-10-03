const Router = require("express");
const router = new Router();
const BookController = require("../controllers/bookController");

router.post("/", BookController.create);
router.get("/", BookController.getAll);
router.get("/:id", BookController.getOne);
router.put("/:id", BookController.update);
router.delete("/:id", BookController.delete);

module.exports = router;
