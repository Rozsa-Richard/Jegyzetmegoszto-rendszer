import { Router } from "express";
import * as db from "../data/note.js"

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

router.delete("/:id", (req,res) => {
    //töröl --lakat
});

export default router;