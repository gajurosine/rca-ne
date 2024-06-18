const prisma = require("../helpers/prisma");
const { createBookSchema, updateBookSchema } = require("../schemas");

// Create a book
const createBook = async (req, res) => {
    /*  #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/CreateBookDto"
                }  
            }
        }
    } 
    */
    try {
        // Parse and validate request body
        const { name, author, publisher, publicationYear, subject } = createBookSchema.parse(req.body);
        
        // Check if a book with the same name already exists
        const nameTaken = await prisma.book.findUnique({
            where: { name: name }
        });
        if (nameTaken) throw new Error("Book already registered");

        // Create a new book in the database
        const book = await prisma.book.create({
            data: { name, author, publisher, publicationYear, subject }
        });

        // Respond with the created book data
        res.status(201).json({ success: true, data: book });
    } catch (error) {
        // Handle validation errors
        let message = error.message;
        if (error.name === "ZodError") {
            message = error.errors[0].message || "Invalid data";
        }
        return res.status(400).json({ success: false, message });
    }
};

// Read the book using ID
const readBook = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the book by ID
        const book = await prisma.book.findUnique({
            where: { id: id }
        });

        if (!book) {
            return res.status(404).json({ success: false, message: "Book not found" });
        }

        // Respond with the book data
        res.status(200).json({ success: true, data: book });
    } catch (error) {
        console.error('Error reading the book:', error); // Log the error for debugging
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Read all books
const getBooks = async (req, res) => {
    try {
        // Retrieve all books from the database
        const books = await prisma.book.findMany();

        // Respond with the list of books
        res.status(200).json({ success: true, data: books });
    } catch (error) {
        console.error('Error reading book:', error); // Log the error for debugging
        return res.status(500).json({ success: false, message: error.message || "Internal server error" });
    }
};

// Update a book using ID
const updateBook = async (req, res) => {
    try {
        const { id } = req.params;

        // Parse and validate request body
        const data = updateBookSchema.parse(req.body);

        // Update the book in the database
        const book = await prisma.book.update({
            where: { id: id },
            data
        });

        // Respond with the updated book data
        res.status(200).json({ success: true, data: book });
    } catch (error) {
        let message = error.message;
        if (error.name === "ZodError") {
            message = error.errors[0].message || "Invalid data";
        } else if (error.code === 'P2025') { // Prisma error code for record not found
            message = "Book not found";
        }
        console.error('Error updating the book:', error); // Log the error for debugging
        return res.status(400).json({ success: false, message });
    }
};

// Delete a book using ID
const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ success: false, message: "Book ID is required" });
        }

        // Delete the book from the database
        const book = await prisma.book.delete({
            where: { id: id }
        });

        // Respond with a success message and the deleted book data
        res.status(200).json({ success: true, message: "Book deleted successfully", data: book });
    } catch (error) {
        let message = error.message;
        if (error.code === 'P2025') { // Prisma error code for record not found
            message = "Book not found";
        }
        console.error('Error deleting book:', error); // Log the error for debugging
        return res.status(400).json({ success: false, message });
    }
};

module.exports = { createBook, readBook, updateBook, deleteBook, getBooks };
