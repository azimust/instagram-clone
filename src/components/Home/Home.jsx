import React, { useEffect, useState } from 'react'
import Posts from './Posts/Posts'
import './Home.css'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import Stories from './Stories/Stories'

const Home = () => {
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
        <div className='home'>
            <Stories />
            <div className="posts">
                {posts.map((post) => {
                    return <Posts key={post.id} {...post} />
                })}
            </div>
        </div>
    )
}

export default Home