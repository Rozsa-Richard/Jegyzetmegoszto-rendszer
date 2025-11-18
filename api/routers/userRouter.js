import { Router } from "express";
import * as db from "../data/usersTable.js"
import {getUserNotesById, countUserPublicNotes} from "../data/notesTable.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const router = Router();

router.post("/register", async (req,res) => {
    const {name, email, password} = req.body;
    if (!name || !email || !password)
        return res.status(400).json({message: "Invalid credentials"});

    let user = db.getUserByMail(email);
    if (user)
        return res.status(400).json({message: "This email is alredy used"});
    
    user = db.getUserByName(name);
    if (user)
        return res.status(400).json({message: "This name is alredy used"});
    
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const savedUser = db.saveUser(name, email, hashedPassword);
    return res.status(201).json(savedUser);
});

router.post("/login", async (req,res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) 
            return res.status(400).json({message: "Invalid credentials"});

        const user = db.getUserByMail(email);
        if (!user){
            return res.status(400).json({message: "Invalid credentials"});
        }
            
        if (bcrypt.compareSync(password, user.password)){
            const token = jwt.sign({id: user.id, email: user.email},process.env.JWT_SECRET_KEY,{expiresIn:'1h'});
            return res.status(200).json({id: user.id, token: token});
        }
        return res.status(400).json({message: "Invalid credentials"});
    }
    catch (error){
        console.log(error);
        return res.status(400).json({message: "Invalid credentials"});
    }
});

router.get("/", (req, res) => {
    const users = db.getUserNames();
    return res.status(200).json(users);
});

router.get("/:id", (req, res) => {
    const user = db.getUserById(+req.params.id);
    if (!user)
        res.status(404).json({message:"Not found"});
    return res.status(200).json(user);
});

router.get("/:id/count", (req, res) => {
    const notesCount = countUserPublicNotes(+req.params.id);
    return res.status(200).json(notesCount);
})

router.get("/:id/notes", (req, res) => {
    const user = db.getUserById(+req.params.id);
    if (!user)
        return res.status(404).json({message:"Not found"});
    const notes = getUserNotesById(user.id);
    return res.status(200).json(notes);
});

export default router;