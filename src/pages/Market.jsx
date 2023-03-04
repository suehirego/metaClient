import React, { useContext } from 'react';
import './style.scss';
import { Link } from 'react-router-dom';
import NavBar from '../components/navbar/NavBar'
import { MdLocationOn, MdSell, MdPhoneIphone, MdPets } from 'react-icons/md';
import { IoNotifications } from 'react-icons/io5';
import { FaInbox, FaCar, FaHome, FaTshirt } from 'react-icons/fa';
import { GiMoneyStack } from 'react-icons/gi';
import { AuthContext } from '../context/AuthContext';
import StorefrontIcon from '@mui/icons-material/Storefront';

function Market() {

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
                                <StorefrontIcon className='browseIcon' />
                                <span>Browse All</span>
                            </div>
                            <div className='item'>
                                <IoNotifications className='listIcon' />
                                <span>Notificatios</span>
                            </div>
                            <div className='item'>
                                <FaInbox className='listIcon' />
                                <span>Inbox</span>
                            </div>
                            <div className='item'>
                                <GiMoneyStack className='listIcon' />
                                <span>Buying</span>
                            </div>
                            <div className='item'>
                                <MdSell className='listIcon' />
                                <span>Selling</span>
                            </div>

                        </div>

                        <hr />

                        <div className='menu'>

                            <p style={{ color: '#282828', marginBottom: '20px' }}>Categories:</p>

                            <div className='item'>
                                <FaCar className='listIcon' />
                                <span>Vehicles</span>
                            </div>
                            <div className='item'>
                                <MdPhoneIphone className='listIcon' />
                                <span>Electronics</span>
                            </div>
                            <div className='item'>
                                <FaHome className='listIcon' />
                                <span>Home Sales</span>
                            </div>
                            <div className='item'>
                                <FaTshirt className='listIcon' />
                                <span>Appareal</span>
                            </div>
                            <div className='item'>
                                <MdPets className='listIcon' />
                                <span>Pet Supplies</span>
                            </div>

                        </div>

                    </div>
                </div>

                <div className='marketFeed'>
                    <div className="feedTop">
                        <div className="heading">
                            <h1>Marketplace</h1>
                            <p>Today's Picks</p>
                        </div>
                        <div className="location">
                            <span>
                                <MdLocationOn />
                                Kampala .
                            </span>
                            <p>65KM</p>
                        </div>
                    </div>

                    <div className="feedTop">
                        <div className="seller">
                            <h3>Register to join as a seller;</h3>
                            <form>
                                <input
                                    placeholder='Email'
                                    type="email"
                                    name="email"
                                    required
                                // onChange={handleChange}
                                />
                                <button>Submit</button>

                            </form>
                        </div>

                        <div className="location">
                            <span>Category:</span>
                            <p>Electronics</p>
                        </div>
                    </div>



                    <div className="feedDetails">
                        <div className="wrapper">
                            <div className="wrapperItem">
                                <img src={"https://meta-inspo.herokuapp.com/images/pagepics/phone.png"} alt="" />
                                <p>Apple iPhone 13 Green</p>
                                <span>$1,820</span>
                            </div>
                            <div className="wrapperItem">
                                <img src={"https://meta-inspo.herokuapp.com/images/pagepics/camera.png"} alt="" />
                                <p>Canon EOS 4000D EF-S </p>
                                <span>$1,049</span>
                            </div>
                            <div className="wrapperItem">
                                <img src={"https://meta-inspo.herokuapp.com/images/pagepics/headphones.png"} alt="" />
                                <p>LUT7 7 Field Monitor</p>
                                <span>$1,840</span>
                            </div>
                            <div className="wrapperItem">
                                <img src={"https://meta-inspo.herokuapp.com/images/pagepics/monitor.png"} alt="" />
                                <p>Bang & Olufsen Headphones </p>
                                <span>$4,795</span>
                            </div>
                        </div>



                    </div>
                </div>
            </div>

        </div>
    )
}

export default Market