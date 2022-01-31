import React, { useState } from 'react';
import { useSelector , useDispatch} from 'react-redux';
import { successful } from '../reducers/login';
import logo from "../assets/logo.png"

function Login() {

    const state = useSelector((state) => state);
    const login = useSelector((state) => state.login);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [username, setUsername] = useState("")    
    const [password, setPassword] = useState("")

    const [error, setError] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        if(user.username == username && user.password == password) {
            setError("")
            dispatch(successful());
        }else {
            setError("Username or password not correct.")
        }
    };
    return (
        <>
            <div className="form-signin text-center">
                <form onSubmit={handleSubmit}>
                    <img className="mb-4" src={logo} alt="logo" width="72" height="72" />
                    <h1 className="h3 mb-3 fw-normal">Please login</h1>

                    <div className="form-floating">
                        <input onChange={(e) => setUsername(e.target.value)} type="text" className="form-control" id="username" placeholder="Username" />
                        <label htmlFor="username">Username</label>
                    </div>
                    <div className="form-floating mt-2">
                        <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="password" placeholder="Password" />
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="form-text text-danger">{error}</div>
                    <button className="w-100 btn btn-lg btn-outline-dark mt-3" type="submit">Login</button>
                </form>
            </div>
        </>
    );
}

export default Login;
