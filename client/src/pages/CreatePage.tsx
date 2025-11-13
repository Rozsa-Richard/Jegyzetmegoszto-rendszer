import { useEffect, useState } from "react";
import Header from "../components/Header";
import "../styles/default.css";
import apiClient from "../api/apiClient";
import type { Note } from "../types/types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Pencil from "../components/Pencil";

const CreatePage = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [is_public, setIspublic] = useState<boolean>(true);

    const changeIsPublic = () => is_public ? setIspublic(false) : setIspublic(true);
    
    useEffect(()=> {
        if (localStorage.getItem('accessToken') == null)
            toast.error("Bejelentkezés nélkül jegyzetet nem lehet létrehozni");
    },[]);

    const createButton = () => {
        if (localStorage.getItem('accessToken') == null)
            toast.error("Bejelentkezés nélkül jegyzetet nem lehet létrehozni");
        else {
            const newNote = {
            title,
            content,
            is_public: (is_public ? 1 : 0),
        } as Note
        
        apiClient.post("/notes", newNote)
            .then(() => {
                navigate('/home');
                toast.info("Sikeresen létrehoztad!"); 
            })
            .catch(() => toast.error("Hiba történt!") );
        }
    };

  return (<>
    <Header />

    <div className='page'>
        <Pencil />

        <div className="title">
            <h1>Jegyzet létrehozás</h1>
        </div>

        <form className="createForm">
            <div className="mb-3">
                <label className="form-label">Cím:</label>
                <input className="form-control" type="text" placeholder="Cím" onChange={(e)=> setTitle(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Tartalom:</label>
                <textarea className="form-control" onChange={(e)=> setContent(e.target.value)}></textarea>
            </div>
            <div className="form-check form-switch mb-3 my-switch">
                <label className="form-check-label">Publikus, Mindenki láthatja</label>
                <input className="form-check-input" type="checkbox" role="switch" checked={is_public} onChange={changeIsPublic}/>
            </div>
            <button type="button" className='btn btn-secondary' onClick={createButton}>Létrehozás</button>
        </form>
    </div>
  </>)
}

export default CreatePage