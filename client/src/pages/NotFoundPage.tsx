import Header from "../components/Header"
import NotFound from "../components/NotFound"
import Pencil from "../components/Pencil"

const NotFoundPage = () => {
  return (<>
    <Header />

    <div className="page">
        <Pencil />

        <div className="title">
           <h1>Hiba</h1>
        </div>

        <NotFound />
    </div>
  </>)
}

export default NotFoundPage