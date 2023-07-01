import React, { useContext } from 'react'
import { GlobalDispatchContext } from '../../state/context/GlobalContext'

const SidebarIcon = ({ name, icon }) => {
    const dispatch = useContext(GlobalDispatchContext)

    const handleClickIcon = () => {
        if (name === 'Создать')
            dispatch({
                type: 'SET_IS_UPLOAD_POST_MODAL_OPEN',
                payload: {
                    isOpen: true
                }
            })
    }

    return (
        <li onClick={handleClickIcon} className='bar__item'>
            <span className='bar__icon'>{icon}</span>
            <span className='bar__name'>{name}</span>
        </li>
    )
}

export default SidebarIcon