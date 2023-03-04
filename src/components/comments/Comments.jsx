import React from 'react';
import './comments.scss';
import { comments } from '../../dummyData';

function Comments() {

    //Images public folder
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    return (
        <div className='comments'>
            <hr/>
            <div className='write'>
                <img src={PF + "/person/avatar1.png"} alt="" />
                <input type="text" placeholder="Write a Comment..."/>
                <button>Send</button>
            </div>
            {comments.map((comment) => (
                <div className='comment'>
                    <img src={PF + comment.profilePic} alt=""/>
                    <div className='info'>
                        <span>{comment.name}</span>
                        <p>{comment.desc}</p>
                    </div>
                    <span className='date'>2 hours ago</span>
                </div>
            ))}
        </div>
    )
}

export default Comments