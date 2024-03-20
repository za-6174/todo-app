import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext, useEffect } from 'react';
import AuthContext from '../../AuthContext';


export default function Logout() {

    const navigate = useNavigate();

    const logout = async () => {
        try {
            const {data} = await axios.post("http://localhost:4000/logout", {}, {withCredentials: true})
            if (data === "cookie cleared") {
                navigate("/login")
            }
        }
        catch (error) {
            console.log(error.message)
        }
    }

    logout()
}
