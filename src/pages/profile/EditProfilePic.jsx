import React from 'react';
import { useState, useContext } from 'react';
import './edit.scss';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const EditProfilePic = () => {

    const { user } = useContext(AuthContext);
    const [file, setFile] = useState(null);

    
    const navigate = useNavigate();
    
    const upload = async () => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await axios.post("/upload", formData);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmit = async (e) => {
        const imgUrl = await upload();
        e.preventDefault();
        try {
            const updatedProfilePic = {
                userId: user._id,
                profilePic: imgUrl,
                
            };

            await axios.put("https://meta-inspo.herokuapp.com/api/users/" + user._id, updatedProfilePic);
        } catch (err) {
            console.log(err);
        }

    }


    return (

        <div className="edit">
            <h3>Edit your Profile</h3>

            <form className="editProfileWrapper" onSubmit={handleSubmit}>

                <div className="editTop">

                    <span>Hi {user.username}</span>

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
                        src={file ? URL.createObjectURL(file) : "/assets/person/avatar1.png"}
                        
                        alt=""
                        className="editProfileImg"
                    />

                </div>

                <button type="submit" className="updateBtn">Update</button>

            </form>


        </div>
    )
}

export default EditProfilePic