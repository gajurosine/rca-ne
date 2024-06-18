const z = require("zod");

// Schema for creating a new user
const createUserSchema = z.object({
  firstName: z.string().nonempty(),  // First name must be a non-empty string
  lastName: z.string().nonempty(),   // Last name must be a non-empty string
  email: z.string().email(),         // Email must be a valid email format
  password: z.string().min(8).max(50),  // Password must be between 8 and 50 characters
});

// Schema for updating an existing user
const updateUserSchema = z.object({
  firstName: z.string().nonempty(),  // First name must be a non-empty string
  lastName: z.string().nonempty(),   // Last name must be a non-empty string
  email: z.string().email().optional(),  // Email is optional but if provided, must be in valid email format
  password: z.string().min(8).max(50).optional(),  // Password is optional but if provided, must be between 8 and 50 characters
});

// Schema for creating a new book
const createBookSchema = z.object({
  name: z.string().nonempty(),       // Book name must be a non-empty string
  author: z.string(),                // Author must be a string
  publisher: z.string().nonempty(),  // Publisher must be a non-empty string
  publicationYear: z.number(),       // Publication year must be a number
  subject: z.string().nonempty(),    // Subject must be a non-empty string
});

// Schema for updating an existing book
const updateBookSchema = z.object({
  name: z.string().nonempty().optional(),  // Book name is optional but if provided, must be a non-empty string
  author: z.string(),                      // Author must be a string
  publisher: z.string().nonempty(),        // Publisher must be a non-empty string
  publicationYear: z.number().max(4, "Year impossible"),  // Publication year must be a number with a max value of 4
  subject: z.string().nonempty(),          // Subject must be a non-empty string
});

module.exports = { createUserSchema, updateUserSchema, createBookSchema, updateBookSchema };
