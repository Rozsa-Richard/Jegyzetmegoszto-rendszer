import "../styles/pencil.css"

const Pencil = () => {
  return (
    <div className="floating-pencil">
  <div className="pencil-eraser"></div>
  <div className="pencil-body">
    <div className="pencil-item"><a className="nav-link" href="/home">Főoldal</a></div>
    <div className="pencil-item"><a className="nav-link" href="/profiles">Jegyzetelők</a></div>
    <div className="pencil-item"><a className="nav-link" href="/create">Hozzáadás</a></div>
  </div>
  <div className="pencil-tip"></div>
</div>
  )
}

export default Pencil