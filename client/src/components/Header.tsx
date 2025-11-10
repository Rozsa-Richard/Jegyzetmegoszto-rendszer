import '../styles/default.css';
import logo from '../common/notes.png'
import '../styles/default.css'
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    const isLogedIn = localStorage.getItem('accessToken') == null ?
        (<>
            <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/login">Bejelentkezés</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/register">Regisztráció</a>
            </li>
        </>) : (<>
            <li className='nav-item'>
                <button className='btn btn-secondary' onClick={()=> {localStorage.clear(); navigate('/home');}}>Kijelentkezés</button>
            </li>
        </>);
                
  return (
    <nav className="navbar sticky-top navbar-expand-lg bg-warning homeNavigation">
        <div className="container-fluid">
            <a className="navbar-brand" href="http://localhost:5173/home">
                <img src={logo} alt="Logo" width="30" height="24" className="d-inline-block align-text-center"/>
                Jegyzetmegosztó
            </a>
            <div className="d-flex" id="navbarSupportedContent">
                <ul className="navbar-nav mb-2 mb-lg-0">
                    {isLogedIn}
                </ul>
            </div>
        </div>
    </nav>
  );
}

export default Header