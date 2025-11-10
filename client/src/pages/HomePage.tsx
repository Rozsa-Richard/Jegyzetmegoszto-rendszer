import Header from '../components/Header'
import NoteList from '../components/NoteList'
import Pencil from '../components/Pencil'
import '../styles/default.css'

function HomePage() {
  return (
    <>
      <Header />
    

      <div className='d-flex align-items-center justify-content-center page'>
        <Pencil/>
        <NoteList url='/notes/public'/>
      </div>
    </>
  )
}

export default HomePage