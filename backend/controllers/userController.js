
const prisma = require("../helpers/prisma");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateTokens");
const { createUserSchema, updateUserSchema } = require("../schemas");
const { ZodError } = require("zod");

const createUser = async (req, res) => {
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/SignUpDto"
                    }  
                }
            }
        } 
    */
    try {
        // Validate the request body against the schema
        const { firstName, lastName, email, password } = createUserSchema.parse(req.body);

        console.log(firstName)
        // Check if the email is already taken
        const emailTaken = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (emailTaken) throw new Error("Email already taken");

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user in the database
        const user = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword,
            },
        });

        // Remove the password field from the response
        delete user.password;
        return res.status(201).json({ success: true, data: user });
    } catch (error) {
        // Handle Zod validation errors
        if (error instanceof ZodError) {
            return res.status(400).json({ success: false, message: error.issues[0].message });
        }
        // Handle other errors
        return res.status(400).json({ success: false, message: error.message });
    }
};

const login = async (req, res) => {
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/LoginDto"
                    }  
                }
            }
        } 
    */
    try {
        const { email, password } = req.body;
        
        // Find the user by email
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) throw new Error("Invalid credentials");

        // Compare the provided password with the stored hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) throw new Error("Invalid credentials");

        // Generate a JWT token for the user
        const token = generateToken(user.id);

        // Remove the password field from the response
        delete user.password;
        return res.status(200).json({
            success: true,
            data: {
                token,
                user,
            },
        });
    } catch (error) {
        // Handle any errors that occur during login
        return res.status(400).json({ success: false, message: error.message });
    }
};

const readUser = async (req, res) => {
    try {
        const { userId } = req.params;

        // Find the user by ID
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

        if (!user) throw new Error("User not found");

        // Remove the password field from the response
        delete user.password;
        return res.json({ success: true, data: user });
    } catch (error) {
        // Handle any errors that occur during user retrieval
        return res.status(404).json({ success: false, message: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        
        // Validate the request body against the schema
        const updateData = updateUserSchema.parse(req.body);

        // Ensure email uniqueness if email is being updated
        if (updateData.email) {
            const emailTaken = await prisma.user.findUnique({
                where: {
                    email: updateData.email,
                },
            });
            if (emailTaken && emailTaken.id !== userId) throw new Error("Email already taken");
        }

        // Hash the new password if provided
        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }

        // Update the user in the database
        const updatedUser = await prisma.user.update({
            where: {
                id: userId,
            },
            data: updateData,
        });

        // Remove the password field from the response
        delete updatedUser.password;
        return res.json({ success: true, data: updatedUser });
    } catch (error) {
        // Handle Zod validation errors
        if (error instanceof ZodError) {
            return res.status(400).json({ success: false, message: error.issues[0].message });
        }
        // Handle other errors
        return res.status(400).json({ success: false, message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;

        // Delete the user from the database
        await prisma.user.delete({
            where: {
                id: userId,
            },
        });

        return res.json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        // Handle any errors that occur during user deletion
        return res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = { createUser, login, readUser, updateUser, deleteUser };
