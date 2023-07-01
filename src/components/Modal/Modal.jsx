import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useContext, useEffect, useRef, useState } from 'react'
import './Modal.css'
import { toast } from 'react-hot-toast'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { db, storage } from '../../lib/firebase'
import { v4 as uuidv4 } from 'uuid';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { GlobalContext, GlobalDispatchContext } from '../../state/context/GlobalContext'

const Modal = () => {
    const dispatch = useContext(GlobalDispatchContext)

    const { isOpen } = useContext(GlobalContext);
    const closeModal = () => {
        dispatch({
            type: 'SET_IS_UPLOAD_POST_MODAL_OPEN',
            payload: {
                isOpen: false
            }
        })
    }

    const [file, setFile] = useState('')

    const [media, setMedia] = useState({
        src: '',
        isUploading: false,
        caption: ''
    })

    useEffect(() => {
        const reader = new FileReader()

        const handleEvent = (e) => {
            switch (e.type) {
                case 'load':
                    return setMedia((prev) => ({
                        ...prev,
                        src: reader.result
                    }))
                case 'error':
                    console.log(e);
                    return toast.error('что-то не работает')
                default:
                    return
            }
        }

        if (file) {
            reader.addEventListener('load', handleEvent)
            reader.addEventListener('error', handleEvent)
            reader.readAsDataURL(file)
        }

        return () => {
            reader.removeEventListener('load', handleEvent)
            reader.removeEventListener('error', handleEvent)
        }

    }, [file])

    const currentImage = useRef(null)

    const { user } = useContext(GlobalContext)

    const handlePostMedia = async (url) => {
        const postId = uuidv4()
        const postRef = doc(db, 'posts', postId)
        const post = {
            id: postId,
            image: url,
            caption: media.caption,
            username: user.username,
            createdAt: serverTimestamp()
        }
        try {
            await setDoc(postRef, post);
        } catch (error) {
            console.log(error);
            toast.error('Ошибка загрузки поста')
        }
    }

    const handleUploadPost = async () => {
        if (!file) return toast.error('Пожалуйста загрузите изображение')
        setMedia((prev) => ({ ...prev, isUploading: true }))

        const toastId = toast.loading('Пост публикуется...')
        const postName = `posts/${uuidv4()}-${file.name}`
        const storageRef = ref(storage, postName)

        try {
            const uploadTask = await uploadBytes(storageRef, file)
            const url = await getDownloadURL(uploadTask.ref)
            await handlePostMedia(url)

            toast.success('Пост опубликован!', {
                id: toastId
            })
        } catch (error) {
            toast.error('Ошибка загрузки поста', {
                id: toastId
            })
            console.log(error);
        } finally {
            setMedia({
                src: '',
                isUploading: false,
                caption: ''
            })
            setFile('')
            closeModal()
        }
    }

    const handleRemovePost = () => {
        setFile('')
        currentImage.current.src = ''
    }

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="dialog" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="transition" />
                    </Transition.Child>

                    <div className="dialog__container">
                        <div className="dialog__cart">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="dialog__panel">
                                    <Dialog.Title
                                        as="h3"
                                        className="dialog__title"
                                    >
                                        Создание публикации
                                    </Dialog.Title>
                                    <div className='dialog__button'>
                                        {!file ?
                                            (
                                                <>
                                                    <label htmlFor="post">
                                                        Выбрать на компьютере
                                                    </label>
                                                    <input className='file__input' onChange={(e) => setFile(e.target.files[0])}
                                                        value={file.fileName}
                                                        type="file"
                                                        name='post'
                                                        id='post'
                                                        multiple={false}
                                                        accept='image/jpeg,image/png'
                                                    />
                                                </>
                                            ) :
                                            (
                                                <div className='dialog__image'>
                                                    <input className='image__input' type='image' src={media.src} ref={currentImage} />
                                                    <input value={media.caption} onChange={(e) => setMedia((prev) => ({ ...prev, caption: e.target.value }))} type="text" name='caption' id='caption' className='caption__input' placeholder='Добавить описание' />
                                                    <div className='upload__buttons'>
                                                        <button onClick={handleRemovePost}>Удалить</button>
                                                        <button onClick={handleUploadPost}>Загрузить</button>
                                                    </div>
                                                </div>
                                            )}
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default Modal