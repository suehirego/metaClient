import React, { useContext, useEffect, useState } from 'react';
import "./profile.scss";
import "./modal.scss";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { TiGroup } from 'react-icons/ti';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import axios from 'axios';
import HomeFeed from '../../components/feed/HomeFeed';
import { AuthContext } from '../../context/AuthContext';
import { IoCamera } from 'react-icons/io5';
import { MdSchool } from 'react-icons/md';
import { BsPersonPlusFill, BsFillPersonDashFill } from 'react-icons/bs';
import { FaBriefcase, FaHome, FaRegClock, FaUserFriends } from 'react-icons/fa';

//edit modal
import Modal from 'react-modal';
import CoverPic from './CoverPic';
import EditProfile from './EditProfile';


function ProfilePage() {

    const [user, setUser] = useState({});
    const [friends, setFriends] = useState([]);
    // let { username } = useParams();
    const { username } = useParams();
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    const { user: currentUser, dispatch } = useContext(AuthContext);

    //GET CURRENT PROFILE HOLDER(user)
    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`https://meta-inspo.herokuapp.com/api/users?username=${username}`);
            setUser(res.data);
        };
        fetchUser();
    }, [username]);

    ///modal
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [profilemodalIsOpen, setProfileIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    /////
    function openProfileModal() {
        setProfileIsOpen(true);
    }
    ////

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = 'red';
        subtitle.style.marginTop = '20px';
        subtitle.style.marginBottom = '20px';
        subtitle.style.marginLeft = '40%';
        subtitle.style.marginRight = '50%';
        subtitle.style.width = '80px';
    }

    function afterOpenProfileModal() {
        subtitle.style.color = 'red';
        subtitle.style.marginTop = '20px';
        subtitle.style.marginBottom = '20px';
        subtitle.style.marginLeft = '58px';
        subtitle.style.width = '80px';
    }

    function closeModal() {
        setIsOpen(false);
    }
    function closeProfileModal() {
        setProfileIsOpen(false);
    }

    // //GET FRIENDLIST
    useEffect(() => {
        const getFriends = async () => {
            try {
                const friendList = await axios.get("https://meta-inspo.herokuapp.com/api/users/friends/" + user._id);
                setFriends(friendList.data);
            } catch (err) {
                // console.log(err);
            }
        };
        getFriends();
    }, [user]);

    /////mobile follow

    //ADD OR FOLLOW

    const handleFollow = async (e) => {

        try {
            await axios.put(`/users/${user._id}/follow`, {
                userId: currentUser._id,
            });
            dispatch({ type: "FOLLOW", payload: user._id });
        } catch (err) {
            console.log(err);
        }

    }

    //UNFOLLOW / REMOVE FRIEND

    const handleUnfollow = async (e) => {

        try {
            await axios.put(`/users/${user._id}/unfollow`, {
                userId: currentUser._id,
            });
            dispatch({ type: "UNFOLLOW", payload: user._id });
        } catch (err) {
            console.log(err);
        }

    }
    ////mobile follow///


    ///Mobile Boi///
    function renderProfileRightBar() {
        return (
            <>

                <div className="profileBottom">

                    {/* <div className='profileDetails'> */}
                    <div className='rightbarContainer'>

                        <div className='rightbarCard'>

                            <h4>Bio</h4>

                            <div className='heading'>
                                {user.tagline ?
                                    <span>{user.tagline}</span>
                                    :
                                    <p>"Insert your Tagline or something that best describes you here"</p>
                                }

                                {user.username === currentUser.username ?

                                    <button className='editBtn' onClick={openProfileModal}>
                                        <ModeEditIcon className='icon' />
                                        Edit Profile
                                    </button>

                                    :

                                    <div className='followBtns'>

                                        {currentUser.followings?.includes(user._id) ?

                                            <button className='friendsBtn' onClick={handleUnfollow}>
                                                UNFOLLOW
                                                <BsFillPersonDashFill className='friendIcon' />
                                            </button>

                                            :

                                            <button className='friendsBtn' onClick={handleFollow}>
                                                FOLLOW
                                                <BsPersonPlusFill className='friendIcon' />
                                            </button>
                                        }

                                    </div>
                                }


                            </div>

                            <div className='items'>
                                <div className="sidebarItem">
                                    <FaBriefcase className="sidebarIcon" />
                                    <div>
                                        {user.jobTitle ?
                                            <span>{user.jobTitle + " "}  at </span>
                                            :
                                            <span>"Insert your Job Title"  at </span>
                                        }
                                        <span className="details">{user.employer}</span>
                                    </div>

                                </div>
                                <div className="sidebarItem">
                                    <FaHome className="sidebarIcon" />
                                    <div>
                                        <span>Lives in </span>
                                        <span className="details">{user.city}</span>
                                    </div>
                                </div>
                                <div className="sidebarItem">
                                    <MdSchool className="sidebarIcon" />
                                    <div>
                                        <span>Went to </span>
                                        <span className="details">{user.school}</span>
                                    </div>
                                </div>
                                <div className="sidebarItem">
                                    <FaRegClock className="sidebarIcon" />
                                    <div>
                                        <span>Joined </span>
                                        <span className="details">{moment(user.createdAt).format('MMMM YYYY')}</span>
                                    </div>
                                </div>
                                <div className="sidebarItem">
                                    <FaUserFriends className="sidebarIcon" />
                                    <div>
                                        <span>Friends with </span>
                                        <span className="details">{user.followings?.length}
                                            {user.followings?.length === 1 ? " Person" : " People"}
                                        </span>
                                    </div>
                                </div>

                            </div>

                            <hr />

                            <div className='sidebarFriends'>
                                <h4>Friends</h4>

                                <div className="profileFriends">

                                    {friends.map((friend) => (
                                        <div className="friendItem" key={friend._id}>

                                            <Link to={"/profile/" + friend.username} style={{ textDecoration: "none" }}>

                                                <img
                                                    src={
                                                        friend.profilePic
                                                            ? `https://meta-inspo.herokuapp.com/images/${friend.profilePic}`
                                                            : "https://meta-inspo.herokuapp.com/images/person/friend1.png"
                                                    }
                                                    className="firendImg" alt=""
                                                />
                                                <span>{friend.firstname + " " + friend.lastname}</span>
                                            </Link>
                                        </div>

                                    ))}


                                </div>

                            </div>




                        </div>

                    </div>

                </div>

            </>
        )
    }
    ////Mobile Bio////



    return (
        <div className='profileWrapper'>

            <div className='profile'>

                <div className='profileTop'>

                    <img className='coverImg'

                        src={
                            user.coverPic
                                ? PF + user.coverPic
                                : "/assets/cover.png"
                        }
                        alt=""
                    />
                    <button className='coverBtn' onClick={openModal}>
                        Edit Cover Photo
                        <ModeEditIcon />
                    </button>
                    <button className='mobileCoverBtn' onClick={openModal}>
                        <IoCamera className='cameraIcon'/>
                    </button>

                    <div className='profileWrapper'>
                        <div className="top">
                            <img
                                src={
                                    user.profilePic
                                        ? `https://meta-inspo.herokuapp.com/images/${user.profilePic}`
                                        : "https://meta-inspo.herokuapp.com/images/person/avatar1.png"
                                }
                                className='profileImg' alt=""
                            />

                            {/* <IoCamera className='profileEditIcon' onClick={openModal}/> */}

                            <div className='topItem'>
                                <h2>{user.firstname + " " + user.lastname}</h2>
                                <p>
                                    <TiGroup className='groupIcon' />
                                    {user.followings?.length}
                                    {user.followings?.length === 1 ? " Friend" : " Friends"}
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

                {renderProfileRightBar()}
                <HomeFeed username={username} />

            </div>

            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                className="Modal"
                overlayClassName="Overlay"
            >
                <CoverPic />
                <button onClick={closeModal} ref={(_subtitle) => (subtitle = _subtitle)}>
                    close
                </button>
            </Modal>

            <Modal
                isOpen={profilemodalIsOpen}
                onAfterOpen={afterOpenProfileModal}
                onRequestClose={closeProfileModal}
                contentLabel="Example Modal"
                className="Modal"
                overlayClassName="Overlay"
            >
                <EditProfile />
                <button onClick={closeProfileModal} ref={(_subtitle) => (subtitle = _subtitle)}>
                    close
                </button>
            </Modal>


        </div>
    )
}

export default ProfilePage