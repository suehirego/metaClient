import React, { useContext } from 'react';
import './global.scss';
import {
    createBrowserRouter,
    RouterProvider,
    Outlet,
    Navigate,
} from "react-router-dom";
import LeftBar from './components/leftbar/LeftBar';
import NavBar from './components/navbar/NavBar';
import RightBar from './components/rightbar/RightBar';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import HomePage from './pages/homepage/HomePage';
import ProfilePage from './pages/profile/ProfilePage';
import { AuthContext } from './context/AuthContext';
import EditProfile from './pages/profile/EditProfile';
import Watch from './pages/Watch';
import Groups from './pages/Groups';
import Market from './pages/Market';


function App() {

    // const { currentUser} = useContext(AuthContext);
    const { user} = useContext(AuthContext);
    

    //MAIN LAYOUT for homepage and profilepage
    const Layout = () => {
        return (
            <div>
                <NavBar />
                <div style={{ display: 'flex' }}>
                    <LeftBar />
                    <div style={{ flex: 6 }}>
                        <Outlet />
                    </div>
                    <RightBar />
                </div>

            </div>
        )
    };

   

    //Allow only logged in user to view homepage
    const ProtectedRoute = ({ children}) => {
        const { user } = useContext(AuthContext);

        if(!user){
            return <Navigate to="/login" />;
        }else{
            return children;
        }  
    }

    //ROUTER
    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <ProtectedRoute user={user}>
                    <Layout/>
                </ProtectedRoute>
            ),
            children:[
                {
                    path:"/",
                    element: <HomePage/>,
                },
                {
                    path:"profile/:username",
                    element: <ProfilePage user/>,
                },
            ]
        },
        {
            path: "/login",
            element: <Login/>
        },
        {
            path: "/register",
            element: <Register/>
        },
        {
            path: "/edit",
            element: <EditProfile/>
        },
        {
            path: "/watch",
            element: <Watch/>
        },
        {
            path: "/market",
            element: <Market/>
        },
        {
            path: "/groups",
            element: <Groups/>
        },
        

    ])


    return (
        <div className='container' id="container">
                <RouterProvider router={router} />
            </div>
    )
}

export default App

