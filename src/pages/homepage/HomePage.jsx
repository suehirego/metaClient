import React from 'react';
import "./home.scss";
import HomeFeed from '../../components/feed/HomeFeed';

function HomePage() {

    return (
        <div className='home'>
            <div className='container'>
                <HomeFeed/>
            </div>
        </div>
    )
}

export default HomePage