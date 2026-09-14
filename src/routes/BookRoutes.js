const router = require("express").Router();
const upload = require("../middlewares/UploadMiddleware");
const BookController = require("../controllers/BookController");

router.post("/addbook",upload.single("cover"),BookController.AddBook);

module.exports = router;