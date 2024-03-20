import { createContext } from 'react'

const AuthContext = createContext({
    user: "",
    setUser: (user) => {}
})

export default AuthContext;