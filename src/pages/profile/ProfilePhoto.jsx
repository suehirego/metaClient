import React from 'react';
import { useState, useContext } from 'react';
import './edit.scss';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

const ProfilePhoto = () => {

    const { user } = useContext(AuthContext);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "upload");

        try {
            setLoading(true)
            const uploadRes = await axios.post(
                "https://api.cloudinary.com/v1_1/tunjooadmin/image/upload",
                data
            );
            const { url } = uploadRes.data;

            const updatedUser = {
                profilePic: url,
            };

            const res = await axios.put("https://meta-inspo.herokuapp.com/api/users/update/" + user._id, updatedUser);
            localStorage.setItem("user", JSON.stringify(res.data));
            setLoading(false)
            window.location.reload();
        } catch (err) {
            console.log(err.response.data);
        }
    };


    return (

        <div className="edit">

            <form className="editProfileWrapper" onSubmit={handleSubmit}>

                <div className="editTop">

                    <div className="editTopText">
                        <h4>Edit Profile Photo</h4>
                        <label htmlFor="fileInput">
                            <span className="editImgBtn">Click to Upload</span>
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

                <div className="coverBottom">
                    <button type="submit" className="updateBtn2">{loading ? "Loading..." : "Update"}</button>
                </div>

            </form>


        </div>
    )
}

export default ProfilePhoto