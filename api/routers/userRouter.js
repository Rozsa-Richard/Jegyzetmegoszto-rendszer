import { Router } from "express";
import * as db from "../data/usersTable.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const router = Router();

router.post("/register", async (req,res) => {
    const {name, email, password} = req.body;
    if (!name || !email || !password)
        return res.status(400).json({message: "Invalid credentials"});

    const user = db.getUserByMail(email);
    if (!user){
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const savedUser = db.saveUser(name, email, hashedPassword);
        return res.status(201).json(savedUser);
    }

    return res.status(400).json({message: "This email alredy used"})
});

router.post("/login", async (req,res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) 
            return res.status(400).json({message: "Invalid credentials"});

        const user = db.getUserByMail(email);
        if (!user)
            return res.status(400).json({message: "Invalid credentials"});

        if (bcrypt.compareSync(password, user.password)){
            const token = jwt.sign({id: user.id, email: user.email},process.env.JWT_SECRET_KEY,{expiresIn:'1h'});
            return res.status(200).json(token);
        }

        return res.status(400).json({message: "Invalid credentials"});
    }
    catch (error){
        console.log(error);
        return res.status(400).json({message: "Invalid credentials"});
    }
});

export default router;