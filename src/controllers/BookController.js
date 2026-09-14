const BooksModel = require("../modles/Bookmodel");
const BookDetailModel = require("../modles/Bookdetailmodel");
const cloudinaryUpload = require("../utils/CloudinaryUpload");


const AddBook = async (req, res) => {
    try {

        const book = new BooksModel({
            name: req.body.name,
            description: req.body.description
        });

        const savedBook = await book.save();

         const cloudinaryResponse = await cloudinaryUpload(
            req.file.path
        );

        const coverUrl = cloudinaryResponse.secure_url;


        const bookDetail = new BookDetailModel({
            bid: savedBook._id,
            price: req.body.price,
            cover: coverUrl,
            pages: req.body.pages,
            publishYear: req.body.publishYear,
            status: req.body.status
        });

        const savedBookDetail = await bookDetail.save();

        res.status(201).json({
            message: "Book added successfully",
            book: savedBook,
            bookDetail: savedBookDetail
        });

    } catch (error) {
        res.status(500).json({
            message: "Error adding book",
            error: error.message
        });
    }
};

module.exports = {
    AddBook
};