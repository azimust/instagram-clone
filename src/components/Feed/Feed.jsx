import React, { useContext } from 'react'
import './Feed.css'
import Sidebar from '../Sidebar/Sidebar'
import Rightbar from '../Rightbar/Rightbar'
import Modal from '../Modal/Modal'
import Home from '../Home/Home'
import { Routes, Route } from 'react-router-dom';
import { GlobalContext } from '../../state/context/GlobalContext'
import Profile from '../Profile/Profile'

const Feed = () => {
    const { user } = useContext(GlobalContext)

    return (
        <div className='feed'>
            <div className='container'>
                <div className="feed__body">
                    <Sidebar />
                    <Modal />
                    <div className="feed__content">
                        <Routes >
                            <Route path='/instagram-clone/' element={<Home />} />
                            <Route path={`/instagram-clone/${user.username}`} element={<Profile />} />
                        </Routes>
                    </div>
                    <Rightbar />
                </div>
            </div>
        </div>
    )
}

export default Feed