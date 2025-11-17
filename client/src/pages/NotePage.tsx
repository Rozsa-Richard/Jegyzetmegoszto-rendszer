import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import type { Note, User } from '../types/types';
import apiClient from '../api/apiClient';
import { toast } from 'react-toastify';
import NotFound from '../components/NotFound';
import Pencil from '../components/Pencil';
import '../styles/default.css';
import padlock from '../common/padlock.png'

const NotePage = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const [note, setNote] = useState<Note>();
  const [user, setUser] = useState<User>();

  useEffect(()=> {    
    apiClient.get(`/notes/${id}`)
        .then((r)=> {
            setNote(r.data);
            apiClient.get(`/users/${r.data.userId}`).then((r2)=> setUser(r2.data)).catch(()=> toast.error("Közzétevő betöltése sikertelen"));
        })
        .catch(()=> toast.error("404 Oldal nem található"));
  },[]);

    const deleteButton = () => {
      console.log("DSa")
      apiClient.delete(`/notes/${id}`)
          .then(()=> {toast.success("Sikeres törlés"); navigate("/home");})
          .catch(()=> toast.error("Törlés sikertelen"));
    };

    const updateandDeleteButton = (localStorage.getItem("userId") == `${user?.id}`) && 
    <p>
      <button className='btn btn-secondary' onClick={()=> (navigate(`/edit/${id}`))}>Szerkesztés</button>
      <button className='btn btn-danger' onClick={deleteButton}>Törlés</button>
    </p>;

  return (<>
    <Header />

    <div className='page'>
        <Pencil />

        <div className="title">
           <h1>Jegyzet</h1>
        </div>

        {note ? 
        (<div className='createForm'>
            <h1>{note.title}</h1>
            <p>Tartalom: <br/> {note.content}</p>
            Készítette: {user?.name}
            {note.is_public == 0 && <small><img src={padlock} alt="Zárolt"/></small>}

            {updateandDeleteButton}
        </div>) : (<NotFound />)}
    </div>
  </>)
}

export default NotePage