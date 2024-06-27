/* eslint-disable no-global-assign */
import React, { useContext, useState, useEffect } from 'react';
import './rightbar.scss';
import '../../pages/profile/modal.scss';
import axios from 'axios';
import moment from 'moment';
import { MdSchool } from 'react-icons/md';
import { Link, useParams } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { BsPersonPlusFill, BsFillPersonDashFill } from 'react-icons/bs';
import { FaBriefcase, FaHome, FaRegClock, FaUserFriends } from 'react-icons/fa';
import EditProfile from '../../pages/profile/EditProfile';


function RightFeed() {

    const { username } = useParams();
    const [user, setUser] = useState({});
    const [friends, setFriends] = useState([]);
    const { user: currentUser, dispatch } = useContext(AuthContext);

    const [openModal, setOpenModal] = useState(false);

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

    const scrollToTop = () => {
        window.scrollTo(0, 0)
    }

    ///modal
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
                    <EditProfile />
                    <button className='closeBtn' onClick={closeModal}>
                        close
                    </button>
                </div>
            </div>
        );
    };



    const HomeRightBar = () => {
        return (
            <>
                <div className='container'>
                    <h4>Sponsored</h4>
                    <p className='subHeading'>Advertise with us!</p>

                    <div className='sponsorItem'>
                        <img src="/assets/sheboss.png" alt="" />
                        <div className='sponsorDetails'>
                            <p>Buaca Tech</p>
                            <h4>Leading Tech Bootcamp</h4>
                            <a href="https://buaca-tech.com/" target='blank' className='a-link'>
                                <span>www.buaca-tech.com</span>
                            </a>
                        </div>
                    </div>

                    <div className='sponsorItem'>
                        <img src="/assets/tunjoo.png" alt="" />
                        <div className='sponsorDetails'>
                            <p>Tunjoo Shop</p>
                            <h4>Latest Fashion Trends</h4>
                            <a href="https://www.tunjoo.com/" target='blank' className='a-link'>
                                <span>www.tunjoo.com</span>
                            </a>
                        </div>
                    </div>

                    <div className='sponsorItem'>
                        <img src="/assets/regonow.png" alt="" />
                        <div className='sponsorDetails'>
                            <p>Regonow</p>
                            <h4>Streamline Group Savings</h4>
                            <a href="https://rego-now.com/" target='blank' className='a-link'>
                                <span>www.rego-now.com</span>
                            </a>
                        </div>
                    </div>

                    <hr />

                </div>
            </>
        )

    }

    const ProfileRightBar = () => {
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
                                    <span style={{ color: "gray", fontSize: '14px' }}>"Insert your Tagline or something that best describes you here"</span>
                                }

                                {user.username === currentUser.username ?

                                    <button className='editBtn' onClick={() => setOpenModal(true)} >
                                        <ModeEditIcon className='icon' />
                                        Edit Profile
                                    </button>

                                    :

                                    <div>

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

                        </div>

                        <hr />

                        <div className='sidebarFriends'>
                            <h4>Friends</h4>

                            <div className="profileFriends">

                                {friends.map((friend) => (
                                    <div className="friendItem" key={friend._id}>

                                        <Link to={`/profile/${friend.username}`} style={{ textDecoration: "none" }} onClick={scrollToTop}>

                                            <img
                                                src={friend.profilePic || "https://res.cloudinary.com/tunjooadmin/image/upload/v1719478384/upload/Beige_Minimalist_Stay_Tuned_Coming_Soon_Instagram_Post_1_r9qvao.png"}
                                                className="firendImg" alt=""
                                            />
                                            <span>{friend.firstname + " " + friend.lastname}</span>
                                        </Link>
                                    </div>

                                ))}

                            </div>

                        </div>

                        <hr />

                    </div>

                </div>

            </>
        )
    }


    return (
        <div className='rightbar'>

            {username ? <ProfileRightBar /> : <HomeRightBar />}

            <Modal
                open={openModal}
                closeModal={() => setOpenModal(false)}
            />

        </div>
    )
}

export default RightFeed






