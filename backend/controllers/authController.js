import generateToken from '../middleware/generateToken.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: 'User not found!!'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: 'Wrong password!'
            });
        }
        else {
            const {password: _, ...safeUser} = user.toObject();
            res.status(200).json({
                message: 'Login Successfull!!',
                safeUser,
                token: generateToken(user._id),
            });
        }

    } catch (error) {
        res.status(500).json({
            message: `${error.message}`
        });
    }
};

const register = async (req, res) => {
    const { name, email, password, mobile } = req.body;

    try {

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: 'User already Exists!!, Please login!!'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            mobile
        });

        await user.save();

        const {password: _, ...safeUser} = user.toObject();
        res.status(200).json({
            message: 'User registered Successfully!!',
            safeUser
        });

    } catch (error) {
        res.status(500).json({
            message: `${error.message}`
        });
    }
};

const getMe = async(req, res) => {
    res.status(200).json({user: req.user});
}

export { login, register, getMe };