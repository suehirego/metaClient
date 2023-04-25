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
import CoverPic from './CoverPic';
import EditProfile from './EditProfile';
import ProfilePhoto from './ProfilePhoto';


function ProfilePage() {

    const [user, setUser] = useState({});
    const [friends, setFriends] = useState([]);
    const { username } = useParams();

    const { user: currentUser, dispatch } = useContext(AuthContext);

    const [openModal, setOpenModal] = useState(false);
    const [openProfileModal, setOpenProfileModal] = useState(false);
    const [openProfilePhotoModal, setOpenProfilePhotoModal] = useState(false);

    //GET CURRENT PROFILE HOLDER(user)
    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`https://meta-inspo.herokuapp.com/api/users?username=${username}`);
            setUser(res.data);
        };
        fetchUser();
    }, [username]);

        // //GET FRIENDLIST
        useEffect(() => {
            const getFriends = async () => {
                try {
                    const friendList = await axios.get("https://meta-inspo.herokuapp.com/api/users/friends/" + user?._id);
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
            await axios.put(`https://meta-inspo.herokuapp.com/api/users/${user._id}/follow`, {
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
            await axios.put(`https://meta-inspo.herokuapp.com/api/users/${user._id}/unfollow`, {
                userId: currentUser._id,
            });
            dispatch({ type: "UNFOLLOW", payload: user._id });
        } catch (err) {
            console.log(err);
        }

    }
    ////mobile follow///

    /// Edit Cover pic modal
    const Modal = ({ open, closeModal }) => {
        if (!open) return null;
        return (
          <div onClick={closeModal} className='Overlay'>
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="Modal"
            >
               <CoverPic />
                <button className='closeBtn' onClick={closeModal}>
                    close
                </button>
            </div>
          </div>
        );
      };

      /// Edit Profile photo
    const ProfilePhotoModal = ({ openProfilePhoto, closeProfilePhotoModal }) => {
        if (!openProfilePhoto) return null;
        return (
          <div onClick={closeProfilePhotoModal} className='Overlay'>
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="Modal"
            >
               <ProfilePhoto />
                <button  className='closeBtn'  onClick={closeProfilePhotoModal}>
                    close
                </button>
            </div>
          </div>
        );
      };

      /// Edit Profile modal
    const ProfileModal = ({ openProfile, closeProfileModal }) => {
        if (!openProfile) return null;
        return (
          <div onClick={closeProfileModal} className='Overlay'>
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="Modal"
            >
               <EditProfile />
                <button  className='closeBtn'  onClick={closeProfileModal}>
                    close
                </button>
            </div>
          </div>
        );
      };
 


    ///Mobile Boi///
    function renderProfileRightBar() {
        return (
            <>

                <div className="profileBottom">

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

                                    <button className='editBtn' onClick={() => setOpenProfileModal(true)}>
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
                                            <Link to={`/profile/${friend.username}`} style={{ textDecoration: "none" }}>

                                                <img
                                                   src={friend.profilePic || "https://res.cloudinary.com/tunjooadmin/image/upload/v1679634861/upload/avatar1_klacib.png"}
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

                        src={ user.coverPic || "https://res.cloudinary.com/tunjooadmin/image/upload/v1682419824/cover_fipqur.png"}
                        alt=""
                    />
                    <button className='coverBtn' onClick={() => setOpenModal(true)}>
                        Edit Cover Photo
                        <ModeEditIcon />
                    </button>
                    <button className='mobileCoverBtn' onClick={() => setOpenModal(true)}>
                        <IoCamera className='cameraIcon' />
                    </button>

                    <div className='profileWrapper'>
                        <div className="top">
                            <img
                                src={user.profilePic || "https://res.cloudinary.com/tunjooadmin/image/upload/v1679634861/upload/avatar1_klacib.png"}
                                className='profileImg' alt=""
                            />

                            <IoCamera className='profilePhotoEditIcon' onClick={() => setOpenProfilePhotoModal(true)}/>

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
                open={openModal}
                closeModal={() => setOpenModal(false)}
            />

            <ProfileModal
                openProfile={openProfileModal}
                closeProfileModal={() => setOpenProfileModal(false)}
            />

            <ProfilePhotoModal
                openProfilePhoto={openProfilePhotoModal}
                closeProfilePhotoModal={() => setOpenProfilePhotoModal(false)}
            />      

        </div>
    )
}

export default ProfilePage