import "../styles/pencil.css"

const Pencil = () => {
  return (
    <div className="d-flex justify-content-center align-items-center pencil-container">
      <div className="pencil">
        <div className="pencil-tip"></div>
        <div className="pencil-body">
          <a className="nav-link" href="/create">Hozzáadás</a>
        </div>
        <div className="pencil-eraser"></div>
      </div>
    </div>
  )
}

export default Pencil