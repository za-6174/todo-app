import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext, useEffect } from 'react';
import AuthContext from '../../AuthContext';
import {API_URL} from '../../utils/API';

export default function Logout() {

    const navigate = useNavigate();

    const logout = async () => {
        try {
            const {data} = await axios.post(`${API_URL}/logout`, {}, {withCredentials: true})
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
