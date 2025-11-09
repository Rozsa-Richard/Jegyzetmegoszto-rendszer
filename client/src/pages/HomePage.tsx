import Header from '../components/Header'
import NoteList from '../components/NoteList'
import '../styles/default.css'

function HomePage() {
  return (
    <>
      <Header />
      
      <div className='d-flex align-items-center justify-content-center page'>
        <NoteList />
      </div>
    </>
  )
}

export default HomePage