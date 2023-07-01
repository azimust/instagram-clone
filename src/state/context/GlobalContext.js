import React, { createContext, useEffect, useReducer } from 'react'
import { globalReducer } from '../reducers/globalReducer'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../lib/firebase'
import useFetchCurrentUser from '../../utils/fetchCurrentUser'

const initialState = {
    user: {},
    isAuthenticated: false,
    isOnnoarded: false,
    isLoading: true,
    isLoading: true,
    isOpen: false
}

export const GlobalContext = createContext(null)
export const GlobalDispatchContext = createContext(null)

const GlobalContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(globalReducer, initialState)
    const { fetchUser } = useFetchCurrentUser()

    useEffect(() => {
        const unsubsribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                dispatch({
                    type: 'SET_IS_AUTHENTICATED',
                    payload: {
                        isAuthenticated: true
                    }
                });
                const userData = await fetchUser()
                if (userData) {
                    dispatch({
                        type: 'SET_USER',
                        payload: {
                            user: userData
                        }
                    })
                    dispatch({
                        type: 'SET_IS_ONBOARDED',
                        payload: {
                            isOnboarded: true
                        }
                    })
                }
            }
            dispatch({
                type: 'SET_LOADING',
                payload: {
                    isLoading: false
                }
            })
        })
        return () => unsubsribe()
    }, [])

    return (
        <GlobalContext.Provider value={state}>
            <GlobalDispatchContext.Provider value={dispatch}>
                {children}
            </GlobalDispatchContext.Provider>
        </GlobalContext.Provider>
    )
}

export default GlobalContextProvider