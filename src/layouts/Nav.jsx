import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { successful, error } from '../reducers/login';
import logo from "../assets/logo.png"
function Nav() {

    const user = useSelector((state) => state.user);
    const login = useSelector((state) => state.login);
    const dispatch = useDispatch();
    let navigate = useNavigate();

    function logout() {
        dispatch(error())
        navigate("../", { replace: true })
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <Link to="/" className="navbar-brand fw-bold">
                        <img src={logo} alt="" width="32" height="32" className="d-inline-block align-text-top me-2" />
                        144p
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    {
                        login ?
                            <div className="collapse navbar-collapse fw-bold" id="navbarNav">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link active dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Movies
                                        </Link>
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <li><Link className="dropdown-item" to="/sort-filter/popular">Popular</Link></li>
                                            <li><Link className="dropdown-item" to="/sort-filter/top_rated">Top Rated</Link></li>
                                        </ul>
                                    </li>
                                    <li class="nav-item">
                                        <Link class="nav-link" to="/about">About</Link>
                                    </li>
                                </ul>
                                <div className="dropdown">
                                    <Link className="navbar-brand dropdown-toggle" to="#" id="navbarDropdown2" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img src={user.avatarUrl} alt={user.username} width="32" height="32" className="d-inline-block align-text-top me-2 rounded-circle" />
                                        {user.username}
                                    </Link>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown2">
                                        <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                                        <li><button className="dropdown-item" onClick={logout}>Logout</button></li>
                                    </ul>
                                </div>
                            </div>
                            :
                            null
                    }
                </div>
            </nav>
        </>
    )
}

export default Nav;
