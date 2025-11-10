import { Router } from "express";
import * as db from "../data/notesTable.js"
import auth from "../authentication.js";

const router = Router();

router.get("/public", (req,res) => {
    const notes = db.getAllPublic();
    return res.status(200).json(notes);
});

router.get("/my", auth,(req,res) => {
    const notes = db.getNotesByUser(req.userId);
    return res.status(200).json(notes);
});

router.post("/", auth, (req,res) => {
    const {title, content, is_public} = req.body;
    if (!title || !content || !(is_public==0 || is_public==1))
        return res.status(400).json({message: "Bad request"});
    db.saveNote(req.userId, title, content, is_public);
    return res.status(201).json({message: "Created"});
});

router.get("/:id", auth, (req,res) => {
    const note = db.getNoteById(+req.params.id);
    if (!note)
        return res.status(404).json({message:"Not Found"});
    if (note.is_public == 0){
        if (note.userId == req.userId)
            return res.status(200).json(note);
        return res.status(404).json({message:"Not Found"})
    }
    return res.status(200).json(note)
});

router.put("/:id", auth,(req,res) => {
    const note = db.getNoteById(+req.params.id);
    if (!note)
        return res.status(404).json({message:"Not Found"});
    const {title, content, is_public} = req.body;
    if (!title || !content || !is_public)
        return res.status(400).json({message: "Bad request"});
    db.updateNote(note.id, req.userId, title, content, is_public);
    return res.status(200).json({message:"OK"});
});

router.delete("/:id", auth, (req,res) => {
    const note = db.getNoteById(+req.params.id);
    if (!note)
        return res.status(404).json({message:"Not Found"});
    if (note.userId != req.userId)
        return res.status(403).json({message:"Access forbidden"});
    db.deleteNote(note.id);
    return res.status(204).json({message:"Delete successful"});
});

export default router;