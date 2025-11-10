import Header from '../components/Header'
import NoteList from '../components/NoteList'

const ProfilePage = () => {
  return (<>
    <Header />

    <div className='d-flex align-items-center justify-content-center page'>
        <NoteList url='/notes/my'/>
      </div>
  </>)
}

export default ProfilePage