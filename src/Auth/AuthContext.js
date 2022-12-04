import axios from "axios";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import {auth} from './firebase-config'

export const AuthContext = createContext();

export function useAuth(){
    return useContext(AuthContext)
}

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)

    let authFetch = axios.create({
        withCredentials: true,
        baseURL: "http://localhost:8000"
    })

    const logout = () => {
        return signOut(auth)
    }

    const verifyAuth = async () => {
        const data = await authFetch.get('/firebase/default')
        console.log(data)
    }

    useEffect(() => {
        signInWithEmailAndPassword(auth, 'user@gmail.com', 'password')
    }, [auth])

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setLoading(true)
            setCurrentUser(user)
            // W TYM MIEJSCU USTAWIC HEADERY authFetcha !!!!!!!!!!!
            setLoading(false)
        })
        return unsubscribe
    }, [])

    return <AuthContext.Provider
    value={{currentUser,
        logout,
        verifyAuth}}>
        {!loading && children}
    </AuthContext.Provider>
}