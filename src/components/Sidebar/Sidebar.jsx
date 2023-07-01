import React, { useEffect, useState } from 'react'
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

const SIDEBAR_ITEMS = [
    {
        icon: <GoHomeFill />,
        url: '/',
        name: 'Главная'
    },
    {
        icon: <FiSearch />,
        url: '/',
        name: 'Поисковый запрос'
    },
    {
        icon: <FaRegCompass />,
        url: '/',
        name: 'Интересное'
    },
    {
        icon: <MdOutlineVideoLibrary />,
        url: '/',
        name: 'Reels'
    },
    {
        icon: <LiaFacebookMessenger />,
        url: '/',
        name: 'Сообщение'
    },
    {
        icon: <AiOutlineHeart />,
        url: '/',
        name: 'Уведомление'
    },
    {
        icon: <BsPlusSquare />,
        url: '/',
        name: 'Создать'
    },
    {
        icon: <BiUserCircle />,
        url: '/',
        name: 'Профиль'
    }
]

const Sidebar = () => {
    const [isMobile, setIsMobile] = useState(false);

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