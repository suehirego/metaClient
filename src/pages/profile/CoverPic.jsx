import React from 'react';
import { useState, useContext } from 'react';
import './edit.scss';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CoverPic = () => {

    const { user, dispatch } = useContext(AuthContext);
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
        e.preventDefault();
        const imgUrl = await upload();
        dispatch({ type: "UPDATE_START" });
        const updatedUser = {
            userId: user._id,
            coverPic: imgUrl,

        };
        try {
            const res = await axios.put("https://meta-inspo.herokuapp.com/api/users/" + user._id, updatedUser);

            dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
            navigate("/");
        } catch (err) {
            dispatch({ type: "UPDATE_FAILURE" });
        }

    }

    return (

        <div className="edit">
            <h3>Edit Cover Photo</h3>

            <form className="editProfileWrapper" onSubmit={handleSubmit}>

                <div className="editTop">

                    <div className="editTopText">
                        <span>Cover Picture</span>
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
                        src={file ? URL.createObjectURL(file) : "/assets/cover.png"}
                        alt=""
                        className="editCoverImg"
                    />

                </div>

                <div className="editBottom">
                    <button type="submit" className="updateBtn">Update</button>
                </div>

            </form>


        </div>
    )
}

export default CoverPic