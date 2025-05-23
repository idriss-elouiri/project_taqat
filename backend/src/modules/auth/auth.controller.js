import Admin from "./auth.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../../utils/error.js";
import jwt from "jsonwebtoken";

export const registerHandler = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newAdmin = new Admin({
        username,
        email,
        password: hashedPassword,
    });

    try {
        await newAdmin.save();
        res.json("register admin successFully");
    } catch (error) {
        next(error);
    }
};

export const loginHandler = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const validAdmin = await Admin.findOne({ username })
        if (!validAdmin) {
            return next(errorHandler(404, "Account admin not found"));
        }

        const validPassword = bcryptjs.compareSync(password, validAdmin.password);
        if (!validPassword) {
            return next(errorHandler(400, "Password Incorrect"));
        }

        const token = jwt.sign(
            { id: validAdmin._id, isAdmin: validAdmin.isAdmin },
            process.env.JWT_SECRET
        );

        const { password: pass, ...rest } = validAdmin._doc;

        return res
            .status(200)
            .cookie("access_token", token

            )
            .json(rest);
    } catch (error) {
        next(error);
    }
};