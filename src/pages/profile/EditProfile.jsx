import React from 'react';
import { useState, useContext } from 'react';
import './edit.scss';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProfile = () => {

    const { user, dispatch } = useContext(AuthContext);
    // const [file, setFile] = useState(null);
    const [success, setSuccess] = useState(false);

    // const [person, setPerson] = useState({
    // username: user.username,
    // firstname: user.firstname,
    // lastname: user.lastname,
    // email: user.email,
    // tagline: user.tagline,
    // jobTitle: user.jobTitle,
    // employer: user.employer,
    // city: user.city,
    // school: user.school,
    // });


    // const handleChange = (e) => {
    //     setPerson((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // };

    // const navigate = useNavigate();

    // const upload = async () => {
    //     try {
    //         const formData = new FormData();
    //         formData.append("file", file);
    //         const res = await axios.post("https://meta-inspo.herokuapp.com/api/upload", formData);
    //         return res.data;
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };


    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const imgUrl = await upload();
    //     dispatch({ type: "UPDATE_START" });
    //     const updatedUser = {
    //         userId: user._id,
    //         profilePic: imgUrl,
    //         ...person,
    //     };
    //     try {
    //         const res = await axios.put("https://meta-inspo.herokuapp.com/api/users/" + user._id, updatedUser);
    //         setSuccess(true);
    //         dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    //         navigate(`/profile/${user.username}`);
    //     } catch (err) {
    //         dispatch({ type: "UPDATE_FAILURE" });
    //     }

    // }


    //EDIT / UPDATE USER
    const [person, setPerson] = useState({
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        tagline: user.tagline,
        jobTitle: user.jobTitle,
        employer: user.employer,
        city: user.city,
        school: user.school,
    });


    const handleChange = (e) => {
        setPerson((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const navigate = useNavigate();

    // const handleClick = async (e) => {
    //     e.preventDefault();
    //     const url = await upload(file);

    //     try {

    //         const updatedUser = {
    //             profile: url,
    //         };

    //         const res = await newRequest.put("/api/user/update/" + currentUser._id, updatedUser);
    //         localStorage.setItem("currentUser", JSON.stringify(res.data));
    //         window.location.reload();
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = {
                ...person
            };

            const res = await axios.put("https://meta-inspo.herokuapp.com/api/users/update/" + user._id, updatedUser);
            localStorage.setItem("user", JSON.stringify(res.data));
            window.location.reload();
        } catch (err) {
            return (err);
        }

    }


    return (

        <div className="edit">
            <h3>Edit your Profile</h3>

            {success && <span style={{ color: 'green' }}>Profile has been updated!</span>}

            <form className="editProfileWrapper" onSubmit={handleSubmit}>

                <div className="editBottom">

                    <div className="editBottomWrapper">

                        <div className="editBottomItem">
                            <label>First Name</label>
                            <input
                                type="text"
                                name="firstname"
                                value={person.firstname}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="editBottomItem">
                            <label>Last Name</label>
                            <input
                                type="text"
                                name="lastname"
                                value={person.lastname}
                                onChange={handleChange}
                            />
                        </div>

                    </div>

                    <div className="editBottomWrapper">

                        <div className="editBottomItem">
                            <label>Username</label>
                            <input
                                type="text"
                                name="username"
                                value={person.username}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="editBottomItem">
                            <label>Email</label>
                            <input
                                type="text"
                                name="email"
                                value={person.email}
                                onChange={handleChange}
                            />
                        </div>

                    </div>

                    <div className="editBottomWrapper">
                        <div className="editBottomItem">
                            <label>Tagline</label>
                            <textarea
                                rows={4}
                                name="tagline"
                                value={person.tagline}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="editBottomWrapper">
                        <div className="editBottomItem">
                            <label>Job Title</label>
                            <input
                                type="text"
                                placeholder={user.jobTitle}
                                name="jobTitle"
                                value={person.jobTitle}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="editBottomItem">
                            <label>Employer</label>
                            <input
                                type="text"
                                name="employer"
                                value={person.employer}
                                onChange={handleChange}
                            />
                        </div>

                    </div>


                    <div className="editBottomWrapper">

                        <div className="editBottomItem">
                            <label>City</label>
                            <input
                                type="text"
                                name="city"
                                value={person.city}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="editBottomItem">
                            <label>School</label>
                            <input
                                type="text"
                                name="school"
                                value={person.school}
                                onChange={handleChange}
                            />
                        </div>

                    </div>

                    <button type="submit" className="updateBtn">Update</button>


                </div>

                

            </form>


        </div>
    )
}

export default EditProfile