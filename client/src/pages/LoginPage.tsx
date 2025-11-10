import { toast } from "react-toastify";
import apiClient from "../apiClient";
import Header from "../components/Header";
import '../styles/default.css';
import type { User } from "../types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const LoginButton = () => {
        const user = {
            email,
            password,
        } as User;

        apiClient.post("/users/login", user)
                .then((r)=> {
                    navigate('/home');
                    toast.info("Sikeres bejelentkezés"); 
                    localStorage.setItem('accessToken',r.data);
                })
                .catch((err)=> err.code =="ERR_NETWORK" ? toast.info("Nem sikerül felvenni a kapcsolatot a szerverrel") : toast.error("Hibás email vagy jelszó"));
    };

    return <>
        <Header />

        <div className="d-flex align-items-center justify-content-center page">
            <div className="authenticationForm">
                <h1>Bejelentkezés</h1>
                <div className="form-floating mb-3 mt-3">
                    <input type="text" className="form-control" placeholder="Email cím" onChange={(e) => setEmail(e.target.value)}/>
                    <label>Email cím</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" className="form-control" placeholder="Jelszó" onChange={(e) => setPassword(e.target.value)}/>
                    <label>Jelszó</label>
                </div>
                <button onClick={LoginButton} className="btn btn-warning mb-3">Bejelentkezés</button>
                <a className="nav-link" href="/register">Nincs még fiókod?</a>
            </div>
        </div>
    </>
};

export default LoginPage;