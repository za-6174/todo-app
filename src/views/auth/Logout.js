import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {API_URL} from '../../utils/API';
import { useContext, useEffect } from 'react';
import AuthContext from '../../AuthContext';

export default function Logout() {

    const {setUser} = useContext(AuthContext)

    const navigate = useNavigate();

    useEffect(() => {
        const logout = async () => {
            try {
                const response = await axios.post(`${API_URL}/logout`, {}, {withCredentials: true})
                if (response.status === 202 ) {
                    setUser(null)
                    navigate("/login")
                }
                else {
                    navigate("/")
                }
            }
            catch (error) {
                console.log(error.message)
            }
        }
        logout()
    }, [navigate, setUser])
}
