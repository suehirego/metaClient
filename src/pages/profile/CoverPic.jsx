import React from 'react';
import { useState, useContext } from 'react';
import './edit.scss';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CoverPic = () => {

    const { user, dispatch } = useContext(AuthContext);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();

    const handleClick = async (e) => {
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
                coverPic: url,
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
            <h3>Edit Cover Photo</h3>

            <form className="editProfileWrapper" onSubmit={handleClick}>

                <div className="editTop">

                    <div className="editTopText">
                        <span>Cover Picture</span>
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
                        src={file ? URL.createObjectURL(file) : "/assets/cover.png"}
                        alt=""
                        className="editCoverImg"
                    />

                </div>

                <div className="coverBottom">
                    <button type="submit" className="updateBtn2">{loading ? "Loading..." : "Update"}</button>
                </div>

            </form>


        </div>
    )
}

export default CoverPic