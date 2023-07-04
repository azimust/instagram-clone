import React, { useContext, useEffect, useState } from 'react'
import './Sidebar.css'
import { GoHome, GoHomeFill } from 'react-icons/go'
import { FiSearch } from 'react-icons/fi'
import { FaRegCompass } from 'react-icons/fa'
import { MdOutlineVideoLibrary } from 'react-icons/md'
import { LiaFacebookMessenger } from 'react-icons/lia'
import { AiOutlineHeart } from 'react-icons/ai'
import { BsPlusSquare, BsInstagram } from 'react-icons/bs'
import { BiUserCircle, BiDoorOpen } from 'react-icons/bi'
import SidebarIcon from './SidebarIcon'
import { auth } from '../../lib/firebase'
import { signOut } from 'firebase/auth'
import { GlobalContext } from '../../state/context/GlobalContext'



const Sidebar = () => {
    const { user } = useContext(GlobalContext)
    const [isMobile, setIsMobile] = useState(false);

    const SIDEBAR_ITEMS = [
        {
            icon: <GoHomeFill />,
            url: '/instagram-clone/',
            name: 'Главная'
        },
        {
            icon: <FiSearch />,
            url: '/instagram-clone/',
            name: 'Поисковый запрос'
        },
        {
            icon: <FaRegCompass />,
            url: '/instagram-clone/',
            name: 'Интересное'
        },
        {
            icon: <MdOutlineVideoLibrary />,
            url: '/instagram-clone/',
            name: 'Reels'
        },
        {
            icon: <LiaFacebookMessenger />,
            url: '/instagram-clone/',
            name: 'Сообщение'
        },
        {
            icon: <AiOutlineHeart />,
            url: '/instagram-clone/',
            name: 'Уведомление'
        },
        {
            icon: <BsPlusSquare />,
            url: '/instagram-clone/',
            name: 'Создать'
        },
        {
            icon: <BiUserCircle />,
            url: `/instagram-clone/${user.username}`,
            name: 'Профиль'
        }
    ]

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1210);
        };

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleLogout = async () => {
        await signOut(auth)
        window.location.reload()
    }

    return (
        <nav className='sidebar'>
            <h1 className='bar__logo'>{isMobile ? <BsInstagram /> : 'Instagram'}</h1>
            <ul className='bar__list'>
                {
                    SIDEBAR_ITEMS.map((el, i) => {
                        return <SidebarIcon key={i} {...el} />
                    })
                }
                <BiDoorOpen onClick={handleLogout} className='leave' />
            </ul>
        </nav>
    )
}

export default Sidebar