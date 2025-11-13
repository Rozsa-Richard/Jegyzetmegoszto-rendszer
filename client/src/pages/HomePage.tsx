import Header from '../components/Header'
import NoteList from '../components/NoteList'
import Pencil from '../components/Pencil'
import '../styles/default.css'

function HomePage() {
  return (
    <>
      <Header />
      
      <div className='page'>
        <Pencil/>
        <div className="title">
          <h1>Publikus jegyzetek</h1>
        </div>
        <div className='w-6'>
          <NoteList url='/notes/public'/>
        </div>
      </div>
    </>
  )
}

export default HomePage