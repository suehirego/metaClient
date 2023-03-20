import React, { useContext, useState, useEffect } from 'react';
import './navbar.scss';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { FaBars, FaTimes } from "react-icons/fa";
import { HiHome, HiUserGroup } from 'react-icons/hi';
import { NavLink } from "react-router-dom";
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { IoClose } from 'react-icons/io5';
import '../../pages/profile/modal.scss';
import axios from 'axios';


function NavBar() {
    
    const { user: currentUser, dispatch } = useContext(AuthContext);

    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    const [openModal, setOpenModal] = useState(false);

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
    }

    const scrollToTop = () => {
        window.scrollTo(0, 0)
    }

    ///Search users
    const[users, setUsers] = useState("");
    const [value, setValue] = useState('')

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    //GET ALL USERS
       useEffect(() => {
        const fetchUsers = async () => {
            const res = await axios.get("https://meta-inspo.herokuapp.com/api/users/all");
            setUsers(res.data);
        }
        fetchUsers();
    }, []);

    const onSearch = (searchTerm) => {
        setValue(searchTerm);

        console.log('search', searchTerm)
    }


    ///modal
    const Modal = ({ open, closeModal }) => {
        if (!open) return null;
        return (
          <div onClick={closeModal} className='NavOverlay'>
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="NavModal"
            >
                                <ul className='userWrapper'>
                    <div className="headingWrapper">
                        <p className='heading'>Recent searches</p>
                        <IoClose className='closeIcon' onClick={closeModal} />
                    </div>

                    <div className="recentWrapper" onClick={closeModal}>
                        <Link style={{ color: 'inherit', textDecoration: 'none', alignItems: "center" }} to={"/profile/john"}>
                            <li className='userItem'>
                                <img className='userImg' src={"https://meta-inspo.herokuapp.com/images/person/john.png"} alt="" />
                                <span className='recent'>John Doe</span>
                            </li>
                        </Link>
                    </div>

                    <hr />

                    <p className='heading'>Search Results</p>

                    {users && users.filter((user) => {
                        const searchTerm = value.toLocaleLowerCase();
                        const username = user.username.toLocaleLowerCase();

                        return (
                            searchTerm &&
                            username.startsWith(searchTerm) &&
                            username !== searchTerm
                        );
                    }

                    )
                        .map(user => (
                            <div className="searchWrapper" onClick={closeModal} key={user.username}>
                                <Link style={{ color: 'inherit', textDecoration: 'none' }} to={"/profile/" + user.username}>
                                    <li key={user.id} className='userItem' onClick={() => onSearch(user.username)}>
                                        <img
                                            className='userImg'
                                            src={
                                                user.profilePic
                                                    ? `https://meta-inspo.herokuapp.com/images/${user.profilePic}`
                                                    : "https://meta-inspo.herokuapp.com/images/person/avatar1.png"
                                            }
                                            alt=""
                                        />
                                        <div className="userName">
                                            <span>{user.firstname + " " + user.lastname}</span>
                                            <p style={{ fontSize: '12px', color: 'gray' }}>{user.username}</p>
                                        </div>
                                    </li>
                                </Link>
                            </div>
                        ))}
                </ul>
              
              
            </div>
          </div>
        );
      };
    

    return (
        <>
            <div className='navbar'>

                <div className='left'>
                    <Link to="/" style={{ textDecoration: 'none' }} onClick={closeMobileMenu}>
                        <img className="navbar-logo" src="/logo2.png" alt="" />
                    </Link>

                    <input
                        type="text"
                        value={value}
                        placeholder="Search..."
                        onChange={handleChange}
                        onClick={() => setOpenModal(true)} 

                    />

                </div>

                <div className="menu-icon" onClick={handleClick}>
                    {click ? <FaTimes /> : <FaBars />}
                </div>

                {/* <div className='center'> */}
                <ul className={click ? "nav-menu active" : "nav-menu"}>

                    <div className='left'>

                        <li className="nav-item" onClick={scrollToTop}>
                            <NavLink
                                to={`/profile/${currentUser.username}`}
                                className={({ isActive }) => "nav-links" + (isActive ? " activated" : "")}
                                onClick={closeMobileMenu}

                            >
                                <img
                                    src={
                                        currentUser.profilePic
                                            ? `https://meta-inspo.herokuapp.com/images/${currentUser.profilePic}`
                                            : "https://meta-inspo.herokuapp.com/images/person/avatar1.png"
                                    }
                                    alt="" 
                                />
                                <span>{currentUser.firstname + " " + currentUser.lastname}</span>
                            </NavLink>
                        </li>

                        <hr className='responsiveHr' style={{ marginTop: '-10px' }} />

                        <li className="nav-item" onClick={scrollToTop}>
                            <NavLink
                                to="/"
                                className={({ isActive }) => "nav-links" + (isActive ? " activated" : "")}
                                onClick={closeMobileMenu}
                            >
                                <HiHome className='navLinksIcon' />
                                <span>Home</span>
                            </NavLink>
                        </li>
                        <li className="nav-item" onClick={scrollToTop}>
                            <NavLink
                                to="/watch"
                                className={({ isActive }) => "nav-links" + (isActive ? " activated" : "")}
                                onClick={closeMobileMenu}
                            >
                                <OndemandVideoIcon className='navLinksIcon' />
                                <span>Watch</span>
                            </NavLink>
                        </li>
                        <li className="nav-item" onClick={scrollToTop}>
                            <NavLink
                                to="/market"
                                className={({ isActive }) => "nav-links" + (isActive ? " activated" : "")}
                                onClick={closeMobileMenu}
                            >
                                <StorefrontIcon className='navLinksIcon' />
                                <span>Marketplace</span>
                            </NavLink>
                        </li>
                        <li className="nav-item" onClick={scrollToTop}>
                            <NavLink
                                to="/groups"
                                className={({ isActive }) => "nav-links" + (isActive ? " activated" : "")}
                                onClick={closeMobileMenu}
                            >
                                <HiUserGroup className='navLinksIcon' />
                                <span>Groups</span>
                            </NavLink>
                        </li>

                    </div>

                    <hr className='responsiveHr' />

                    <div className='right'>

                        <div className='userWrapper'>
                            <li className="nav-item">
                               {currentUser &&
                                <img
                                src={
                                    currentUser.profilePic
                                        // ? PF + currentUser.profilePic
                                        ? `https://meta-inspo.herokuapp.com/images/${currentUser.profilePic}`
                                        : "/assets/person/avatar1.png"
                                }
                                alt="" 
                                />
                                }
                            </li>
                        </div>


                        <li className="nav-btn1" onClick={handleLogout}>
                            <NavLink
                                to="/"
                                style={{ color: 'inherit', textDecoration: 'none' }}
                                className={({ isActive }) => "nav-links" + (isActive ? " activated" : "")}
                                onClick={closeMobileMenu}
                            >
                                LOGOUT
                            </NavLink>
                        </li>

                    </div>


                </ul>

            </div>

            <Modal
                open={openModal}
                closeModal={() => setOpenModal(false)}
            />

        </>
    )
}



export default NavBar;









// import React, { useContext, useState, useEffect } from 'react';
// import './navbar.scss';
// import { Link } from 'react-router-dom';
// import { AuthContext } from '../../context/AuthContext';
// import { FaBars, FaTimes } from "react-icons/fa";
// import { HiHome, HiUserGroup } from 'react-icons/hi';
// import { NavLink } from "react-router-dom";
// import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
// import StorefrontIcon from '@mui/icons-material/Storefront';
// import Modal from 'react-modal';
// import { IoClose } from 'react-icons/io5';
// import '../../pages/profile/modal.scss';
// import axios from 'axios';


// function NavBar() {

//     const PF = process.env.REACT_APP_PUBLIC_FOLDER

//     const { user: currentUser, dispatch } = useContext(AuthContext);

//     const [click, setClick] = useState(false);

//     const handleClick = () => setClick(!click);
//     const closeMobileMenu = () => setClick(false);

//     const handleLogout = () => {
//         dispatch({ type: "LOGOUT" });
//     }

    // const scrollToTop = () => {
    //     window.scrollTo(0, 0)
    // }

//     ///Search users
//     const[users, setUsers] = useState("");
//     const [value, setValue] = useState('')

//     const handleChange = (e) => {
//         setValue(e.target.value)
//     }

//     //GET ALL USERS
//        useEffect(() => {
//         const fetchUsers = async () => {
//             const res = await axios.get("https://meta-inspo.herokuapp.com/api/users/all");
//             setUsers(res.data);
//         }
//         fetchUsers();
//     }, []);

//     const onSearch = (searchTerm) => {
//         setValue(searchTerm);

//         console.log('search', searchTerm)
//     }


//     ///modal
//     const [modalIsOpen, setIsOpen] = React.useState(false);

//     function openModal() {
//         setIsOpen(true);
//     }

//     function afterOpenModal() {
//         // references are now sync'd and can be accessed.
//         // subtitle.style.color = 'red';
//         // subtitle.style.marginTop = '20px';
//         // subtitle.style.marginBottom = '20px';
//         // subtitle.style.marginLeft = '40%';
//         // subtitle.style.marginRight = '50%';
//         // subtitle.style.width = '80px';
//     }

//     function closeModal() {
//         setIsOpen(false);
//     }

//     return (
//         <>
//             <div className='navbar'>

//                 <div className='left'>
//                     <Link to="/" style={{ textDecoration: 'none' }} onClick={closeMobileMenu}>
//                         <img className="navbar-logo" src="/logo2.png" alt="" />
//                     </Link>

//                     <input
//                         type="text"
//                         value={value}
//                         placeholder="Search..."
//                         onChange={handleChange}
//                         onClick={openModal}

//                     />

//                 </div>

//                 <div className="menu-icon" onClick={handleClick}>
//                     {click ? <FaTimes /> : <FaBars />}
//                 </div>

//                 {/* <div className='center'> */}
//                 <ul className={click ? "nav-menu active" : "nav-menu"}>

//                     <div className='left'>

//                         <li className="nav-item" onClick={scrollToTop}>
//                             <NavLink
//                                 to={`/profile/${currentUser.username}`}
//                                 className={({ isActive }) => "nav-links" + (isActive ? " activated" : "")}
//                                 onClick={closeMobileMenu}

//                             >
//                                 <img
//                                     src={
//                                         currentUser.profilePic
//                                             ? `https://meta-inspo.herokuapp.com/images/${currentUser.profilePic}`
//                                             : "https://meta-inspo.herokuapp.com/images/person/avatar1.png"
//                                     }
//                                     alt="" 
//                                 />
//                                 <span>{currentUser.firstname + " " + currentUser.lastname}</span>
//                             </NavLink>
//                         </li>

//                         <hr className='responsiveHr' style={{ marginTop: '-10px' }} />

//                         <li className="nav-item" onClick={scrollToTop}>
//                             <NavLink
//                                 to="/"
//                                 className={({ isActive }) => "nav-links" + (isActive ? " activated" : "")}
//                                 onClick={closeMobileMenu}
//                             >
//                                 <HiHome className='navLinksIcon' />
//                                 <span>Home</span>
//                             </NavLink>
//                         </li>
//                         <li className="nav-item" onClick={scrollToTop}>
//                             <NavLink
//                                 to="/watch"
//                                 className={({ isActive }) => "nav-links" + (isActive ? " activated" : "")}
//                                 onClick={closeMobileMenu}
//                             >
//                                 <OndemandVideoIcon className='navLinksIcon' />
//                                 <span>Watch</span>
//                             </NavLink>
//                         </li>
//                         <li className="nav-item" onClick={scrollToTop}>
//                             <NavLink
//                                 to="/market"
//                                 className={({ isActive }) => "nav-links" + (isActive ? " activated" : "")}
//                                 onClick={closeMobileMenu}
//                             >
//                                 <StorefrontIcon className='navLinksIcon' />
//                                 <span>Marketplace</span>
//                             </NavLink>
//                         </li>
//                         <li className="nav-item" onClick={scrollToTop}>
//                             <NavLink
//                                 to="/groups"
//                                 className={({ isActive }) => "nav-links" + (isActive ? " activated" : "")}
//                                 onClick={closeMobileMenu}
//                             >
//                                 <HiUserGroup className='navLinksIcon' />
//                                 <span>Groups</span>
//                             </NavLink>
//                         </li>

//                     </div>

//                     <hr className='responsiveHr' />

//                     <div className='right'>

//                         <div className='userWrapper'>
//                             <li className="nav-item">
//                                 <img
//                                     src={
//                                         currentUser.profilePic
//                                             ? PF + currentUser.profilePic
//                                             : "/assets/cover.png"
//                                     }
//                                     alt="" 
//                                     />
//                             </li>
//                         </div>


//                         <li className="nav-btn1" onClick={handleLogout}>
//                             <NavLink
//                                 to="/"
//                                 style={{ color: 'inherit', textDecoration: 'none' }}
//                                 className={({ isActive }) => "nav-links" + (isActive ? " activated" : "")}
//                                 onClick={closeMobileMenu}
//                             >
//                                 LOGOUT
//                             </NavLink>
//                         </li>

//                     </div>


//                 </ul>

//             </div>

//             <Modal
//                 isOpen={modalIsOpen}
//                 onAfterOpen={afterOpenModal}
//                 onRequestClose={closeModal}
//                 contentLabel="Example Modal"
//                 className="NavModal"
//                 overlayClassName="NavOverlay"
//                 appElement={document.getElementById('app')}
//             >

                // <ul className='userWrapper'>
                //     <div className="headingWrapper">
                //         <p className='heading'>Recent searches</p>
                //         <IoClose className='closeIcon' onClick={closeModal} />
                //     </div>

                //     <div className="recentWrapper" onClick={closeModal}>
                //         <Link style={{ color: 'inherit', textDecoration: 'none', alignItems: "center" }} to={"/profile/john"}>
                //             <li className='userItem'>
                //                 <img className='userImg' src={"https://meta-inspo.herokuapp.com/images/person/john.png"} alt="" />
                //                 <span className='recent'>John Doe</span>
                //             </li>
                //         </Link>
                //     </div>

                //     <hr />

                //     <p className='heading'>Search Results</p>

                //     {users && users.filter((user) => {
                //         const searchTerm = value.toLocaleLowerCase();
                //         const username = user.username.toLocaleLowerCase();

                //         return (
                //             searchTerm &&
                //             username.startsWith(searchTerm) &&
                //             username !== searchTerm
                //         );
                //     }

                //     )
                //         .map(user => (
                //             <div className="searchWrapper" onClick={closeModal} key={user.username}>
                //                 <Link style={{ color: 'inherit', textDecoration: 'none' }} to={"/profile/" + user.username}>
                //                     <li key={user.id} className='userItem' onClick={() => onSearch(user.username)}>
                //                         <img
                //                             className='userImg'
                //                             src={
                //                                 user.profilePic
                //                                     ? `https://meta-inspo.herokuapp.com/images/${user.profilePic}`
                //                                     : "https://meta-inspo.herokuapp.com/images/person/avatar1.png"
                //                             }
                //                             alt=""
                //                         />
                //                         <div className="userName">
                //                             <span>{user.firstname + " " + user.lastname}</span>
                //                             <p style={{ fontSize: '12px', color: 'gray' }}>{user.username}</p>
                //                         </div>
                //                     </li>
                //                 </Link>
                //             </div>
                //         ))}
                // </ul>

//             </Modal>

//         </>
//     )
// }



// export default NavBar;


