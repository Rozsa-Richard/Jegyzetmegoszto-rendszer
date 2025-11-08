import { useState, useEffect } from 'react'
import type { Note } from '../types';
import apiClient from '../apiClient';
import { toast } from 'react-toastify';
import Header from '../components/Header';

function Home() {
  const [notes, setNotes] = useState<Array<Note>>([]);

  useEffect(()=> {
    apiClient.get("/notes/public").then((r)=> setNotes(r.data)).catch(()=> toast.error("Jegyzetek betöltése sikertelen"));
  },[]);

  return (
    <>
      <Header />

      <div className='list-group notesList'>
        {notes.map((n)=>(
          <a key={n.id} href="#" className='list-group-item list-group-item-action'>
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{n.title}</h5>
              <small>Id: {n.id}</small>
            </div>
            <p className='mb-1'>{n.content}</p>
          </a>
        ))}
      </div>
    </>
  )
}

export default Home
