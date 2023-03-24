import React, { useContext, useState } from 'react';
import './style.scss';
import { Link } from 'react-router-dom';
import NavBar from '../components/navbar/NavBar';
import video1 from "../images/video1.mp4";
import { AuthContext } from '../context/AuthContext';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IoChatboxOutline } from 'react-icons/io5';
import { IoIosShareAlt } from 'react-icons/io';
import TheatersIcon from '@mui/icons-material/Theaters';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import Comments from '../components/comments/Comments';

function Watch() {

    const [commentOpen, setCommentOpen] = useState(false);

    const { user } = useContext(AuthContext);

    return (
        <div className='pages'>
            <NavBar />
            <div className='pageContainer'>

                <div className="sideBar">
                    <div className='container'>
                        <div className='menu'>

                            <Link to={`/profile/${user.username}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div className='mainItem'>
                                    <img
                                        src={user.profilePic || "https://res.cloudinary.com/tunjooadmin/image/upload/v1679634861/upload/avatar1_klacib.png"}
                                        className='profileImg' alt=""
                                    />

                                    <span>{"hi "  + user.firstname}</span>
                                </div>
                            </Link>

                            <div className='item'>
                                <OndemandVideoIcon className='browseIcon' />
                                <span>Home</span>
                            </div>
                            <div className='item'>
                                <VideoCameraFrontIcon className='listIcon' />
                                <span>Live</span>
                            </div>
                            <div className='item'>
                                <TheatersIcon className='listIcon' />
                                <span>Shows</span>
                            </div>
                            <div className='item'>
                                <BookmarkIcon className='listIcon' />
                                <span>Saved Videos</span>
                            </div>

                        </div>

                        <hr />

                    </div>
                </div>

                <div className='watchFeed'>
                    <div className="feedTop">
                        <div className="heading">
                            <h1>Watch</h1>
                            <p>Trending Videos</p>
                        </div>
                    </div>

                    <div className='video'>

                        <div className='videoTop'>

                            <div className='topProfile'>
                            <img src="/assets/person/gloria.png" alt="" />
                                <div className="item">
                                    <span>Nancy Drew</span>
                                    <p>2 months ago</p>
                                </div>
                            </div>

                            <div className="topDesc">
                                <span>
                                    You work directly with our fitness and nutrition coaches who will create a
                                    personalized plan that will work for you.  Yes, you get 2 coaches.
                                    Experience weekly check-ins and life-changing results, all at a price you can afford.
                                </span>
                            </div>

                        </div>

                        <div className='videoCenter'>
                            <video className='videoTag' autoPlay loop muted>
                                <source src={video1} type='video/mp4' />
                            </video>
                        </div>

                        <div className='videoBottom'>
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

                            <div className='videoComments'>
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

                </div>
            </div>

        </div>
    )
}

export default Watch






