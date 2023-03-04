import React, { useState, useRef } from 'react';
import "./login.scss";
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import axios from 'axios';
import { CircularProgress } from '@mui/material';


function Login() {

    const navigate = useNavigate();

    const { loading, error, dispatch } = useContext(AuthContext);

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post("https://meta-inspo.herokuapp.com/api/auth/login", inputs);

            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
            navigate("/");

        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
        }
    };

    return (
        <div className='login'>
            <div className='wrapper'>
                <div className='loginLeft'>
                    <h1>metaInspo</h1>
                    <p>MetaInspo helps you connect with friends and family around the world.</p>
                </div>

                <div className='loginRight'>

                    <h3>Login</h3>

                    <form onSubmit={handleClick}>
                        <input
                            placeholder='Email'
                            type="email"
                            required
                            id="email"
                            // ref={email}
                            onChange={handleChange}

                        />

                        <input
                            placeholder='Password'
                            type="password"
                            minLength="6"
                            required
                            id="password"
                            // ref={password}
                            onChange={handleChange}
                        />

                        <button className='button1' type="submit" disabled={loading}>
                            {loading ? <CircularProgress size="20px" /> : "LOGIN"}
                        </button>

                        <span>Forgot Password?</span>

                        <hr className='loginHr' />

                        <Link to="/register" >
                            <button className='button2'>
                                Create New Account
                            </button>
                        </Link>

                        {error && <span>{error.message}</span>}

                    </form>

                </div>

            </div>
        </div>
    )
}

export default Login


