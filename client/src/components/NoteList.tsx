import { useState, useEffect } from 'react'
import type { Note } from '../types/types'
import apiClient from '../api/apiClient'
import { toast } from 'react-toastify'
import padlock from '../common/padlock.png'

interface NoteListProp{
  url: string;
}

const NoteList = ({url}: NoteListProp) => {
    const [notes, setNotes] = useState<Array<Note>>([]);

    useEffect(()=> {
        apiClient.get(url).then((r)=> {setNotes(r.data)}).catch(()=> toast.error("Jegyzetek betöltése sikertelen"));
    },[]);

  return (<div className='list-group'>
    {notes != null ? 
      (<>
        {notes.map((n)=>(
            <a key={n.id} href={`http://localhost:5173/note/${n.id}`} className='list-group-item list-group-item-action'>
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{n.title}</h5>
                {n.is_public == 0 && <small><img src={padlock} alt="Zárolt"/></small>}
              </div>
              <p className='mb-1'>{n.content}</p>
            </a>
          ))}
      </>) : (<>
        <h1 className='emptyList'>Jegyzetek nem találhatóak</h1>
      </>)}
  </div>)
}

export default NoteList