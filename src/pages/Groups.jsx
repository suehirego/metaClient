import React, { useContext, useState } from 'react';
import './style.scss';
import { Link } from 'react-router-dom';
import NavBar from '../components/navbar/NavBar';
import { AuthContext } from '../context/AuthContext';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IoChatboxOutline } from 'react-icons/io5';
import { IoIosShareAlt } from 'react-icons/io';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import Comments from '../components/comments/Comments';
import { FaPlus } from 'react-icons/fa';

function Groups() {

    const [commentOpen, setCommentOpen] = useState(false);

    const { user } = useContext(AuthContext);

    return (
        <div className='pages'>
            <NavBar />
            <div className='pageContainer'>

                <div className="sideBar">
                    <div className='container'>
                        <div className='menu'>

                            <Link to={`profile/${user.username}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div className='mainItem'>
                                    <img
                                        src={
                                            user.profilePic
                                                ? `https://meta-inspo.herokuapp.com/images/${user.profilePic}`
                                                : "https://meta-inspo.herokuapp.com/images/person/avatar1.png"
                                        }
                                        className='profileImg' alt=""
                                    />

                                    <span>{"hi" + " " + user.firstname}</span>
                                </div>
                            </Link>

                            <div className='item'>
                                <OndemandVideoIcon className='browseIcon' />
                                <span>Your Feed</span>
                            </div>
                            <div className='item'>
                                <VideoCameraFrontIcon className='listIcon' />
                                <span>Discover</span>
                            </div>
                            <button>
                                <FaPlus />
                                Create New Group
                            </button>

                        </div>

                        <hr />

                        <p style={{marginBottom: '20px'}}>Groups you have joined</p>

                        <div className="menu">
                            <div className='item'>
                                <img className='groupIcon'  src={"https://meta-inspo.herokuapp.com/images/person/logo.png"} alt=""  />
                                <span>Rego Foundation</span>
                            </div>
                            <div className='item'>
                            <img className='groupIcon' src={"https://meta-inspo.herokuapp.com/images/pagepics/data.jpg"} alt="" />
                                <span>Data Structures</span>
                            </div>
                            <div className='item'>
                            <img className='groupIcon' src={"https://meta-inspo.herokuapp.com/images/pagepics/javascript.png"} alt="" />
                                <span>JavaScript Engineers</span>
                            </div>
                            <div className='item'>
                            <img className='groupIcon' src={"https://meta-inspo.herokuapp.com/images/pagepics/group2.png"} alt="" />
                                <span>Fresh Peachess</span>
                            </div>
                        </div>

                    </div>
                </div>

                <div className='groupFeed'>
                    <div className="feedTop">
                        <div className="heading">
                            <h1>Groups</h1>
                            <p>Recent Activity</p>
                        </div>
                    </div>

                    <div className='group'>

                        <div className="groupLeft">
                            <div className='groupTop'>

                                <div className='topProfile'>
                                    <img src={"https://meta-inspo.herokuapp.com/images/person/logo.png"} alt="" />
                                    <div className="item">
                                        <span>Rego Foundation</span>
                                        <p>Susan Hirego</p>
                                        <p>November 9, 2021</p>
                                    </div>
                                </div>

                                <div className="topDesc">
                                    <span>
                                        Access to information is critical for enabling rural communities to enter 
                                        into informed dialogue about decisions that affect their lives. 
                                        #ruralcommunities #womenempowerment #sdgs #endpoverty #financialliteracy
                                    </span>
                                </div>

                            </div>

                            <div className='groupCenter'>
                                <img src={"https://meta-inspo.herokuapp.com/images/pagepics/group.png"} alt="" />
                            </div>

                            <div className='groupBottom'>
                                <div className='bottomItem'>
                                    <div className='left'>
                                        <ThumbUpIcon style={{ color: '#1877f2', cursor: 'pointer' }} />
                                        <FavoriteIcon style={{ color: 'red', cursor: 'pointer' }} />
                                        <p>8 people like this</p>
                                    </div>
                                    <div className='right' onClick={() => setCommentOpen(!commentOpen)}>
                                        <p>Comments</p>
                                    </div>
                                </div>

                                <hr />

                                <div className='groupComments'>
                                    <div className='item'>
                                        <ThumbUpIcon className='icon' />
                                        <p>Like</p>
                                    </div>
                                    <div className='item'>
                                        <IoChatboxOutline className='icon' />
                                        <p>Comment</p>
                                    </div>
                                    <div className='item'>
                                        <IoIosShareAlt className='icon' />
                                        <p>Share</p>
                                    </div>
                                </div>

                                {commentOpen && <Comments />}

                            </div>
                        </div>

                        <div className="groupRight">
                            <span>Popular near you</span>
                            <p>Groups people in your area are in</p>
                            <div className="wrapper">
                                <img src={"https://meta-inspo.herokuapp.com/images/pagepics/data.jpg"} alt="" />
                                <div className="imgItem">
                                    <span className='groupName'>Data Structures</span>
                                    <div className="text">
                                        <p>41K members . </p>
                                        <p>3 posts per day</p>
                                    </div>
                                    <button>Join Group</button>
                                </div>

                            </div>

                            <div className="wrapper">
                                <img src={"https://meta-inspo.herokuapp.com/images/pagepics/javascript.png"} alt="" />
                                <div className="imgItem">
                                    <span className='groupName'>JavaScript Engineers</span>
                                    <div className="text">
                                        <p>561K members . </p>
                                        <p>3 posts per day</p>
                                    </div>
                                    <button>Join Group</button>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            </div>

        </div>
    )
}

export default Groups