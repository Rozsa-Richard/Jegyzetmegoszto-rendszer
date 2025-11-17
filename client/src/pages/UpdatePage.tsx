import { useNavigate, useParams } from "react-router-dom"
import Header from "../components/Header"
import Pencil from "../components/Pencil"
import { useEffect, useState } from "react";
import type { Note, User } from "../types/types";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";
import NotFound from "../components/NotFound";

const UpdatePage = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [note, setNote] = useState<Note>({
      title: "",
      content: "",
      is_public: 1
    });
    const [user, setUser] = useState<User>();
    const [is_public, setIspublic] = useState<boolean>(true);

    const changeIsPublic = () => is_public ? setIspublic(false) : setIspublic(true);

    useEffect(()=> {
      apiClient.get(`/notes/${id}`)
          .then((r)=> {
              setNote(r.data);
              apiClient.get(`/users/${r.data.userId}`).then((r2)=> setUser(r2.data)).catch(()=> toast.error("Közzétevő betöltése sikertelen"));
          })
          .catch(()=> toast.error("404 Oldal nem található"));
    },[]);

    const editButton = () =>{
      const noteDto = {
          title: note.title,
          content: note.content,
          is_public: (is_public ? 1 : 0),
      } as Note
      apiClient.put(`/notes/${id}`,noteDto)
          .then(() => {toast.success("Sikeres módosítás"); navigate(`/note/${id}`)})
          .catch(() => toast.error("Sikertelen módosítás"));
    }

  return (<>
    <Header />

    <div className='page'>
        <Pencil />

        <div className="title">
           <h1>Jegyzet Szerkesztés</h1>
        </div>

        {localStorage.getItem("userId") == `${user?.id}`? (
          <form className="createForm">
            <div className="mb-3">
                <label className="form-label">Cím:</label>
                <input className="form-control" value={note.title} type="text" placeholder="Cím" onChange={(e)=> setNote({...note, title: e.target.value})}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Tartalom:</label>
                <textarea className="form-control" value={note.content} onChange={(e)=> setNote({...note, content: e.target.value})}></textarea>
            </div>
            <div className="form-check form-switch mb-3 my-switch">
                <label className="form-check-label">Publikus, Mindenki láthatja</label>
                <input className="form-check-input" type="checkbox" role="switch" checked={is_public} onChange={changeIsPublic}/>
            </div>
            <button type="button" className='btn btn-secondary' onClick={editButton}>Szerkesztés</button>
          </form>) : (<NotFound/>) }
    </div>
  </>)
}

export default UpdatePage