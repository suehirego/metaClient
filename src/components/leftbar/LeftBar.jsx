import React, { useContext } from 'react';
import './leftbar.scss';
import { Link } from 'react-router-dom';
import GroupsIcon from '@mui/icons-material/Groups';
import { MdWork } from 'react-icons/md';
import { AuthContext } from '../../context/AuthContext';


function LeftBar() {

    const {user } = useContext(AuthContext);

    return (
        <div className='leftbar'>

            <div className='container'>
                <div className='menu'>

                    <Link to={`profile/${user.username}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className='mainItem'>
                        <img
                             src={
                                user?.profilePic
                                    ? `https://meta-inspo.herokuapp.com/images/${user?.profilePic}`
                                    : "https://meta-inspo.herokuapp.com/images/person/avatar1.png"
                            }
                            className='profileImg' alt=""
                        />
                            
                            <span>{user.firstname + " " + user.lastname}</span>
                        </div>
                    </Link> 
                    
                    <div className='groupItem'>
                        <img src="/assets/friends.png" alt="" className='groupFriendsIcon' />
                        <span>Friends</span>
                    </div>
                    <div className='item'>
                        <img src="/assets/recent.png" alt="" />
                        <span>Most Recent</span>
                    </div>
                    <div className='groupItem'>
                        <GroupsIcon className='groupIcon' />
                        <span>Groups</span>
                    </div>
                    <div className='item'>
                        <img src="/assets/market.png" alt="" />
                        <span>Marketplace</span>
                    </div>
                    <div className='item'>
                        <img src="/assets/watch.png" alt="" />
                        <span>Watch</span>
                    </div>
                    <div className='item'>
                        <img src="/assets/memory.png" alt="" />
                        <span>Memories</span>
                    </div>

                </div>

                <hr />

                <div className='menu'>

                    <div className='item'>
                        <img src={process.env.PUBLIC_URL + '/assets/wellness.png'} alt="" />
                        <span>Wellness</span>
                    </div>
                    <div className='groupItem'>
                        <MdWork className='groupWorkIcon' />
                        <span>Tech Jobs</span>
                    </div>
                    <div className='item'>
                        <img src={process.env.PUBLIC_URL + '/assets/code.png'} alt="" />
                        <span>100Days of Code</span>
                    </div>
                    <div className='item'>
                        <img src={process.env.PUBLIC_URL + '/assets/javascript.png'} alt="" />
                        <span>JavaScript Practice</span>
                    </div>

                </div>

                <hr />

                <div className='bottom'>
                    <span>This design was inspired by Facebook  |  Built by Susan Hirego</span>
                    <span>JavaScript, React.js, Node.js Express |  Portfolio 2022</span>
                </div>


            </div>
        </div>
    )
}

export default LeftBar