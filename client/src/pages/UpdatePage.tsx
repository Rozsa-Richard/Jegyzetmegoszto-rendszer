import { useParams } from "react-router-dom"
import Header from "../components/Header"
import Pencil from "../components/Pencil"

const UpdatePage = () => {
    const {id} = useParams();

  return (<>
    <Header />

    <div className='page'>
        <Pencil />

        <div className="title">
           <h1>Jegyzet</h1>
        </div>

        <div className="createForm">
            Szerkesztés
        </div>
    </div>
  </>)
}

export default UpdatePage