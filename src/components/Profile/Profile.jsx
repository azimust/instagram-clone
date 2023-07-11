import React, { useContext, useEffect, useState } from 'react'
import userImage from '../../assets/users/anon.webp'
import './Profile.css'
import { GlobalContext } from '../../state/context/GlobalContext'
import { BsPlusLg, BsGrid3X3 } from 'react-icons/bs'
import { db } from '../../lib/firebase'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import Footer from '../Footer/Footer'

const Profile = () => {
  const { user } = useContext(GlobalContext)

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

  const publicCount = posts.filter((post) => post.username === user.username)

  return (
      <div className='profile'>
        <div className="container">
          <div className="profile__body">
            <div className="profile__header">
              <img src={userImage} alt="" />
              <div className="profile__header-info">
                <h3 className="header-info__username">
                  {user.username}
                </h3>
                <div className="header-info__info">
                  <p><span>{publicCount.length}</span> публикаций</p>
                  <p><span>0</span> подписчиков</p>
                  <p><span>0</span> подписок</p>
                </div>
                <span className='header-info__fullname'>{user.fullname}</span>
              </div>
            </div>
            <div className="profile__stories">
              <div className="profile__stories-plus">
                <span><BsPlusLg /></span>
              </div>
              <span className='profile__stories-title'>Добавить</span>
            </div>
            <div className="profile__publics">
              <span><BsGrid3X3 /> ПУБЛИКАЦИИ</span>

              <div className="publics">
                {posts.filter((post) => post.username === user.username).map((post) => {
                  return <img key={post.id} src={post.image} />
                })}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
  )
}

export default Profile