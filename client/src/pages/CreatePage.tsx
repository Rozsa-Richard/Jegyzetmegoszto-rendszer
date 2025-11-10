import { useState } from "react"
import Header from "../components/Header"
import "../styles/default.css"
import apiClient from "../apiClient";
import type { Note } from "../types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreatePage = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [is_public, setIspublic] = useState<boolean>(true);

    const changeIsPublic = () => is_public ? setIspublic(false) : setIspublic(true);
    
    const createButton = () => {
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
    };

  return (<>
    <Header />

    <div className='d-flex align-items-center justify-content-center page'>
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