import React, { useState, useContext, useRef } from 'react';
import './feed.scss'
import { MdTagFaces, MdCancel } from 'react-icons/md';
import { IoLocationSharp } from 'react-icons/io5';
import { IoMdPhotos } from 'react-icons/io';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';


const Share = () => {

    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc = useRef();
    const [file, setFile] = useState(null);
  
    const upload = async () => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await axios.post("/api/upload", formData);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const imgUrl = await upload();
        const newPost = {
          userId: user._id,
          desc: desc.current.value,
          image: imgUrl,
        };
        try {
          await axios.post("https://meta-inspo.herokuapp.com/api/posts", newPost);
          window.location.reload();
        } catch (err) {}
      };

    return (
        <div className="share">

            <div className="shareTop">
                <img
                    src={
                        user?.profilePic
                            ? PF + user.profilePic
                            : PF + "person/avatar1.png"
                    }
                    className="shareProfilePic"

                    alt=""
                />
                <input className="shareInput" placeholder={"What is on your mind  "  + user.firstname + "?"} ref={desc} />
            </div>

            <hr className="shareHr" />

            {file && (
                <div className="shareImgContainer">
                    <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
                    <MdCancel className="cancelIcon" onClick={() => setFile(null)} />
                </div>

            )}

            <form onSubmit={handleSubmit}>
                <div className="shareOptions">
                    <div className="shareOption">
                        <IoLocationSharp style={{ color: '#1877f2' }} className="shareIcon" />
                        <span className="optionText">Location</span>
                    </div>

                    <label htmlFor="file" className="shareOption">
                        <IoMdPhotos style={{ color: 'green' }} className="shareIcon" />
                        <span className="optionText">Photo/Video</span>
                        <input
                            type='file'
                            id='file'
                            accept='.png, .jpeg, .jpg'
                            style={{ display: 'none' }}
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </label>

                    <div className="shareOption2">
                        <MdTagFaces style={{ color: 'goldenrod' }} className="shareIcon" />
                        <span className="optionText">Feelings</span>
                    </div>

                </div>

                <button className="shareBtn" type="submit">Share</button>

            </form>

        </div>
    )
}

export default Share


