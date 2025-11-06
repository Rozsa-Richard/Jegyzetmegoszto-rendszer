import { Router } from "express";
import * as db from "../data/notesTable.js"
import auth from "../authentication.js";

const router = Router();

router.get("/public", (req,res) => {
    const notes = db.getAllPublic();
    return res.status(200).json(notes);
});


//feladatos
router.get("/", (req,res) => {
    //sajátok --lakat
});

router.post("/", (req,res) => {
    //létrehozás --lakat
});

router.get("/:id", (req,res) => {
    //egy kelkérés
});

router.put("/:id", (req,res) => {
    //módosít --lakat
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