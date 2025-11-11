import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import NoteList from '../components/NoteList';
import Pencil from '../components/Pencil';

const ProfilePage = () => {
  const {id} = useParams();

  return (<>
    <Header />

    <div className='page'>
      <Pencil/>
      <div className="title">
        <h1>Profil</h1>
      </div>
      <div className='w-6'>
        <NoteList url='/notes/my'/>
      </div>
    </div>
  </>)
}

export default ProfilePage