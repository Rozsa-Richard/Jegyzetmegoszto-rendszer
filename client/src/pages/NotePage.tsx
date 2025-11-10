import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import type { Note, User } from '../types';
import apiClient from '../apiClient';
import { toast } from 'react-toastify';
import NotFound from '../components/NotFound';
import Pencil from '../components/Pencil';
import '../styles/default.css';

const NotePage = () => {
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
        </div>) : (<NotFound />)}
    </div>
  </>)
}

export default NotePage