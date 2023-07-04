import React from 'react'
import './Stories.css'
import argen from '../../../assets/users/argen.png'
import erbol from '../../../assets/users/erbol.png'
import nuremir from '../../../assets/users/nuremir.png'
import azimitto from '../../../assets/users/azimitto.png'
import kersan from '../../../assets/users/kersan.png'
import tunuk from '../../../assets/users/tunuk.png'
import kyial from '../../../assets/users/kyial.png'
import adil from '../../../assets/users/adil.png'
import kutman from '../../../assets/users/kutman.png'

const STORIES_ITEMS = [
    {
        image: argen,
        name: 'argen__duishobekov',
        isCheck: true
    },
    {
        image: erbol,
        name: 'erbol',
        isCheck: true
    },
    {
        image: nuremir,
        name: 'nuremir'
    },
    {
        image: azimitto,
        name: 'azimitto'
    },
    {
        image: kersan,
        name: 'kersan',
        isCheck: true
    },
    {
        image: tunuk,
        name: 'tunuk'
    },
    {
        image: kyial,
        name: 'kyial',
        isCheck: true
    },
    {
        image: adil,
        name: 'adil'
    },
    {
        image: kutman,
        name: 'kutman'
    },
]

const Stories = () => {
    return (
        <div className='stories'>
            {STORIES_ITEMS.map((el, i) => {
                const checked = el.isCheck ? 'stories__item check' : 'stories__item'

                return (
                    <div key={i} className={checked}>
                        <div style={{ backgroundImage: `url(${el.image})` }} />
                        <span>{el.name}</span>
                    </div>
                )
            })}
        </div>
    )
}

export default Stories