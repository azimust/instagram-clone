import React, { useContext, useEffect, useState } from 'react'
import './Sidebar.css'
import { GoHome, GoHomeFill } from 'react-icons/go'
import { TfiSearch } from 'react-icons/tfi'
import { PiVideoLight } from 'react-icons/pi'
import { LiaFacebookMessenger } from 'react-icons/lia'
import { AiOutlineHeart, AiOutlineCompass } from 'react-icons/ai'
import { BsPlusSquare, BsInstagram } from 'react-icons/bs'
import { BiUserCircle, BiDoorOpen, BiSolidUserCircle } from 'react-icons/bi'
import SidebarIcon from './SidebarIcon'
import { auth } from '../../lib/firebase'
import { signOut } from 'firebase/auth'
import { GlobalContext } from '../../state/context/GlobalContext'



const Sidebar = () => {
    const { user } = useContext(GlobalContext)
    const [isMobile, setIsMobile] = useState(false);

    const SIDEBAR_ITEMS = [
        {
            id: 1,
            icon: <GoHome />,
            url: '/instagram-clone/',
            name: 'Главная',
            iconFill: <GoHomeFill />
        },
        {
            id: 2,
            icon: <TfiSearch />,
            url: '/instagram-clone/',
            name: 'Поисковый запрос',
            iconFill: <TfiSearch />
        },
        {
            id: 3,
            icon: <AiOutlineCompass />,
            url: '/instagram-clone/',
            name: 'Интересное',
            iconFill: <AiOutlineCompass />,
        },
        {
            id: 4,
            icon: <PiVideoLight />,
            url: '/instagram-clone/',
            name: 'Reels',
            iconFill: <PiVideoLight />,
        },
        {
            id: 5,
            icon: <LiaFacebookMessenger />,
            url: '/instagram-clone/',
            name: 'Сообщение',
            iconFill: <LiaFacebookMessenger />,
        },
        {
            id: 6,
            icon: <AiOutlineHeart />,
            url: '/instagram-clone/',
            name: 'Уведомление',
            iconFill: <AiOutlineHeart />,
        },
        {
            id: 7,
            icon: <BsPlusSquare />,
            url: '/instagram-clone/',
            name: 'Создать',
            iconFill: <BsPlusSquare />,
        },
        {
            id: 8,
            icon: <BiUserCircle />,
            url: `/instagram-clone/${user.username}`,
            name: 'Профиль',
            iconFill: <BiSolidUserCircle />
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