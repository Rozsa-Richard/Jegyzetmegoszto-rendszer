import * as db from "./data/usersTable.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

function auth(req, res, next){
    try {
        const accessToken = req.headers["authorization"];
        if (!accessToken)
            return res.status(401).json({message:"Unathorized"});

        const token = jwt.verify(accessToken.split(' ')[1],process.env.JWT_SECRET_KEY);
        const now = Math.floor(Date.now()/1000);
        if (!token ||token.exp < now)
            return res.status(403).json({message:"Access forbidden"});

        const user = db.getUserByMail(token.email);
        if (!user)
            return res.status(403).json({message:"Access forbidden"});

        req.userId = user.id;
        req.userEmail = user.email;
        next();
    }
    catch (err){
        console.log(err);
        return res.status(500).json(err);
    }
}

export default auth;