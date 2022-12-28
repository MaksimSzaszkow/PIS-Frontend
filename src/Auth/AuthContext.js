import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export function useAuth(){
    return useContext(AuthContext)
}

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState("")

    const login = async () => {
        setLoading(true)
        const username = "sherlock"
        const password = "password"
        const data = await fetch('http://localhost:8000/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'username': username, 'password': password})
        })
        const jsonData = await data.json();
        setCurrentUser(jsonData)
        setData("")
        setLoading(false)
    }

    const logout = () => {
        setLoading(true)
        setCurrentUser(null)
        setData("")
        setLoading(false)
    }

    const verifyAuth = async () => {
        setLoading(true)
        const data = await fetch('http://localhost:8000/verify-auth', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${currentUser?.access_token}`
            }
        })
        if (data.ok){
            setData(await data.text())
        }
        else {
            setData("Unauthorized")
        }
        setLoading(false)
    }

    return <AuthContext.Provider
    value={{currentUser,
        login,
        logout,
        verifyAuth,
        data}}>
        {!loading && children}
    </AuthContext.Provider>
}
