import {createContext, useState, useEffect, useContext   } from "react"
import type { ReactNode } from "react"
interface AuthContextType {
    isLogged : boolean,
    setIsLogged: (value: boolean) => void
}

const AuthContext  = createContext<AuthContextType>({
    isLogged: false,
    setIsLogged: ()=>{}
})

export const AuthProvider = ({children}: {children: ReactNode}) => {
    const [isLogged, setIsLogged] = useState<boolean>(!!localStorage.getItem("token"))

    useEffect(()=>{
        const token = localStorage.getItem("token")
        setIsLogged(!!token)
    },[])
  return (
    <AuthContext.Provider value={{isLogged, setIsLogged}}>
            {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);