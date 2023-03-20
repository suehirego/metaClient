import React, { useState, useEffect, useContext } from 'react';
import './posts.scss';
import { IoClose } from 'react-icons/io5';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IoChatboxOutline } from 'react-icons/io5';
import { IoIosShareAlt } from 'react-icons/io';
import { Link } from 'react-router-dom';
import Comments from '../comments/Comments';
import axios from 'axios';
import { format } from "timeago.js";
import { AuthContext } from '../../context/AuthContext';



function Posts({ post }) {

    const [commentOpen, setCommentOpen] = useState(false);
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({});

    const [posts, setPosts] = useState([]);

    const { user: currentUser } = useContext(AuthContext);

    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id));
    }, [currentUser._id, post.likes]);


    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`https://meta-inspo.herokuapp.com/api/users?userId=${post.userId}`);
            setUser(res.data);
        }
        fetchUser();
    }, [post.userId]);




    const handleDelete = async (id) => {
        try {
            await axios.delete(`posts/${id}`, { data: { userId: user._id }, });
            setPosts(posts.filter((post) => post._id !== id));
            window.location.reload();

        } catch (err) {
            console.log(err.message);
        }
    };



    // lIKE HANDER
    const likeHandler = () => {
        try {
            axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
        } catch (err) { }
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
    };




    return (
        <div className='posts'>

            <div className='post'>

                <div className='postTop'>
                    <div className='postTopLeft'>
                        <img
                            src={
                                user.profilePic
                                    ? `https://meta-inspo.herokuapp.com/images/${user.profilePic}`
                                    : "https://meta-inspo.herokuapp.com/images/person/avatar1.png"
                            }

                            alt=""
                        />

                        <Link to={`/profile/${user.username}`} style={{ textDecoration: 'none', color: 'inherit' }}>

                            <div className="item">
                                <span>{user.firstname + " " + user.lastname}</span>
                                <p>{format(post.createdAt)}</p>
                            </div>
                        </Link>
                    </div>


                    {post.userId === currentUser._id &&
                        <IoClose className='topIcon' style={{ cursor: 'pointer' }} onClick={() => handleDelete(post._id)} />
                    }


                </div>

                <div className='postCenter'>
                    <span>{post.desc}</span>
                    <img src={`https://meta-inspo.herokuapp.com/images/${post?.image}`} alt="" />
                </div>

                <div className='postBottom'>
                    <div className='bottomItem'>
                        <div className='left'>
                            <ThumbUpIcon style={{ color: '#1877f2', cursor: 'pointer' }} onClick={likeHandler} />
                            <FavoriteIcon style={{ color: 'red', cursor: 'pointer' }} onClick={likeHandler} />
                            <p>{like} people like this</p>
                        </div>
                        <div className='right' onClick={() => setCommentOpen(!commentOpen)}>
                            <p>Comments</p>
                        </div>
                    </div>

                    <hr />

                    <div className='postComments'>
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
    );
}

export default Posts


