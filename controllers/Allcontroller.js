const User = require("../Models/SignupModel")
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid');

const Signup = async (req, res) => {
    const { email, password } = req.body
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const generateStudentId = (name) => {
            const uuidPart = uuidv4().split('-')[0];
            const sevenDigitId = uuidPart.substring(0, 7);
            const studentId = `${name.split(' ').join('_')}_${sevenDigitId}`;
            return studentId;
        };

        const studentId = generateStudentId(email);

        const hashedPassword = await bcrypt.hash(password, 10);
        const signData = await User.create({ email, userId: studentId, password: hashedPassword })
        const userToken = await signData.generatToken();
        return res.status(200).json({ message: "User saved", userToken, studentId })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error to make you user', error });
    }
}

const SignIn = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found with email:", email);
            return res.status(400).json({ message: "Invalid email" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log("Invalid password for user:", user.email);
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const userToken = await user.generatToken();

        return res.status(200).json({
            message: "Login successful",
            userToken,
        });

    } catch (error) {
        console.error("Server error during login:", error);
        return res.status(500).json({ message: "Server error" });
    }
}



module.exports = { Signup, SignIn }