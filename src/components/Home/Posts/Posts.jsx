import React, { useState } from 'react'
import './Posts.css'
import anon from '../../../assets/users/anon.webp'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { TbMessageCircle2 } from 'react-icons/tb'
import { HiOutlinePaperAirplane } from 'react-icons/hi'
import { BsBookmark } from 'react-icons/bs'

const Posts = ({ createdAt, username, image, caption }) => {
  const [isLiked, setIsLiked] = useState(false)
  const [like, setLike] = useState(0)

  const handleLikePost = async () => {
    setIsLiked(!isLiked)
    if (!isLiked) {
      setLike(like + 1)
    } else {
      setLike(like - 1)
    }
  }

  return (
    <div className="post__body">
      <div className="post__header">
        <img src={anon} alt="" />
        <h5>{username}</h5>
      </div>
      <div className="post__image">
        <img src={image} alt="" />
      </div>
      <div className="post__buttons">
        <div className="">
          <div className="liked" onClick={handleLikePost}>
            {
              isLiked ? <AiFillHeart style={{ color: 'red' }} /> : <AiOutlineHeart />
            }
          </div>
          <TbMessageCircle2 />
          <HiOutlinePaperAirplane />
        </div>
        <BsBookmark />
      </div>
      <div className="post__rating">
        {like} отметок "Нравится"
      </div>
      <div className="post__caption">
        <span style={{ fontWeight: '500' }}>{username}</span> {caption}
      </div>
      <div className="post__input">
        <input type="text" placeholder='Добавить комментарий' />
      </div>
      <div className="post__line"></div>
    </div>
  )
}

export default Posts