import React from 'react';
import { useState, useContext } from 'react';
import './edit.scss';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfilePhoto = () => {

    const { user, dispatch } = useContext(AuthContext);
    const [file, setFile] = useState(null);

    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "upload");
        try {
            const uploadRes = await axios.post(
                "https://api.cloudinary.com/v1_1/tunjooadmin/image/upload",
                data
            );
            const { url } = uploadRes.data;

            dispatch({ type: "UPDATE_START" });
            const updatedUser = {
                userId: user._id,
                profilePic: url,
            };

            const res = await axios.put("https://meta-inspo.herokuapp.com/api/users/" + user._id, updatedUser);
            dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
            navigate(`/profile/${user.username}`);
        } catch (err) {
            dispatch({ type: "UPDATE_FAILURE" });
        }

    };


    return (

        <div className="edit">
            <h3>Edit Profile Photo</h3>

            <form className="editProfileWrapper" onSubmit={handleSubmit}>

                <div className="editTop">

                    <div className="editTopText">
                        <span>Profile Picture</span>
                        <label htmlFor="fileInput">
                            <span className="editImgBtn">Upload</span>
                        </label>

                        <input
                            type="file"
                            id="fileInput"
                            style={{ display: "none" }}
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </div>

                    <img
                        src={file ? URL.createObjectURL(file) : "https://res.cloudinary.com/tunjooadmin/image/upload/v1679634861/upload/avatar1_klacib.png"}
                        alt=""
                        className="editProfileImg"
                    />

                </div>

                <div className="editBottom">
                    <button type="submit" className="updateBtn">Update</button>
                </div>

            </form>


        </div>
    )
}

export default ProfilePhoto