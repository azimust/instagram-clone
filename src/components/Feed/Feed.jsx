import React, { useContext, useEffect, useState } from 'react'
import './Feed.css'
import Sidebar from '../Sidebar/Sidebar'
import Stories from '../Stories/Stories'
import Rightbar from '../Rightbar/Rightbar'
import Posts from '../Posts/Posts'
import Modal from '../Modal/Modal'
import { GlobalContext, GlobalDispatchContext } from '../../state/context/GlobalContext'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../../lib/firebase'

const Feed = () => {
    // const dispatch = useContext(GlobalDispatchContext)
    // const { isUploadPostModalOpen } = useContext(GlobalContext)

    // const closeModal = () => {
    //     dispatch({
    //         type: 'SET_IS_UPLOAD_POST_MODAL_OPEN',
    //         payload: {
    //             isUploadPostModalOpen: false
    //         }
    //     })
    // }

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        const postsCollection = collection(db, 'posts')
        const q = query(postsCollection, orderBy('createdAt', 'desc'))
        onSnapshot(q, (snapshot) => {
            const posts = snapshot.docs.map((doc) => doc.data())
            setPosts(posts)
            setLoading(false)
        })
    }, [])

    return (
        <div className='feed'>
            <div className='container'>
                <div className="feed__body">
                    <Sidebar />
                    <Modal/>
                    <div className="feed__content">
                        <Stories />
                        <div className="posts">
                            {posts.map((post) => {
                                return <Posts key={post.id} {...post} />
                            })}
                        </div>
                    </div>
                    <Rightbar />
                </div>
            </div>
        </div>
    )
}

export default Feed