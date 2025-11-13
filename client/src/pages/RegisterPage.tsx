import { useState } from "react";
import Header from "../components/Header";
import '../styles/default.css';
import { toast } from "react-toastify";
import type { User } from "../types/types";
import apiClient from "../api/apiClient";
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const navigate = useNavigate();

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordAgain, setPasswordAgain] = useState<string>("");

    const RegisterButton = () => {
        if (password != passwordAgain)
            toast.error("A két jelszó nem egyezik");
        else {
            const user = {
                name,
                email,
                password,
            } as User;

            apiClient.post("/users/register", user)
                .then(()=> {toast.info("Sikeres regisztráció!"); navigate('/login');})
                .catch((err)=> err.code =="ERR_NETWORK" ? toast.info("Nem sikerül felvenni a kapcsolatot a szerverrel") : toast.error(err.response.data.message));
        }
    };

    return <>
        <Header />

        <div className="d-flex align-items-center justify-content-center page">
            <div className="authenticationForm">
                <h1>Regisztráció</h1>
                <div className="form-floating mb-3 mt-3">
                    <input type="text" className="form-control" placeholder="Felhasználó név" onChange={(e) => setName(e.target.value)}/>
                    <label>Felhasználó név</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" placeholder="Email cím" onChange={(e) => setEmail(e.target.value)}/>
                    <label>Email cím</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" className="form-control" placeholder="Jelszó" onChange={(e) => setPassword(e.target.value)}/>
                    <label>Jelszó</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" className="form-control" placeholder="Jelszó újra" onChange={(e) => setPasswordAgain(e.target.value)}/>
                    <label>Jelszó újra</label>
                </div>
                <button onClick={RegisterButton} className="btn btn-warning mb-3">Bejelentkezés</button>

                <a className="nav-link" href="/login">Van már fiókod?</a>
            </div>
        </div>
    </>
};

export default RegisterPage;