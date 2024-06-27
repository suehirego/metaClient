import React, {useState, useRef} from 'react';
import "./register.scss";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


function Register() {

    const username = useRef();
    const firstname = useRef();
    const lastname = useRef();
    const email = useRef();
    const password = useRef();

    const [err, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            username: username.current.value,
           firstname:firstname.current.value,
            lastname: lastname.current.value,
            email: email.current.value,
            password: password.current.value,
        };
        try {
            await axios.post("https://meta-inspo.herokuapp.com/api/auth/register", user);
            //redirect user to login page
            navigate("/login");

        } catch (err) {
            console.log(err);
            setError(err.response.data);
        }

    };



    return (
        <div className='register'>
            <div className='wrapper'>
                <div className='registerLeft'>
                    <h1>metaInspo</h1>
                    <p>MetaInspo helps you connect with friends and family around the world.</p>
                </div>

                <div className='registerRight'>

                    <h3>Register</h3>

                    <form onSubmit={handleSubmit}>
                        <input
                            placeholder='Username'
                            type="text"
                            name="username"
                            required
                             ref={username}
                        />

                        <input
                            placeholder='First Name'
                            type="text"
                            name="firstname"
                            required
                             ref={firstname}
                        />

                        <input
                            placeholder='Last Name'
                            type="text"
                            name="lastname"
                            required
                             ref={lastname}
                        />

                        <input
                            placeholder='Email'
                            type="email"
                            name="email"
                            required
                             ref={email}
                        />

                        <input
                            placeholder='Password'
                            type="password"
                            id="password"
                            minLength="6"
                            required
                             ref={password}
                        />

                        <button className='button1' type="submit">
                            Register
                        </button>

                        {err && <p style={{marginTop:60}}>{err}</p>}

                        <hr className='registerHr' />

                        <span>Already have an account?</span>

                        <Link to="/login">
                            <button className='button2'>Login</button>
                        </Link>

                    </form>

                </div>

            </div>
        </div>
    )
}

export default Register