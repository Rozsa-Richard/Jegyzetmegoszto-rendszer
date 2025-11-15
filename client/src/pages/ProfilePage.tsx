import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import NoteList from '../components/NoteList';
import Pencil from '../components/Pencil';
import { useEffect, useState } from 'react';
import apiClient from '../api/apiClient';
import { toast } from 'react-toastify';
import type { User } from '../types/types';

const ProfilePage = () => {
  const {id} = useParams();
  const [user, setUser] = useState<User>();

  useEffect(()=> {
    if (id != "me")
      apiClient.get(`/users/${id}`)
        .then((r) => {
          setUser(r.data);
        })
        .catch(()=> toast.error("Profil betöltése sikertelen!"));
  },[]);

  return (<>
    <Header />

    <div className='page'>
      <Pencil/>
  
      <div className="title">
        <h1>{id == "me" ? ("Saját profilom") : (`${user?.name} profilja`)}</h1>
      </div>
      <div className='w-6'>
        {id =="me" ? (<NoteList url='/notes/my'/>) : (<NoteList url={`/users/${id}/notes`}/>)}
      </div>
    </div>
  </>)
}

export default ProfilePage