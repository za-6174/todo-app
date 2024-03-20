import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import AuthContext from './AuthContext'

import Home from './views/home/Home';
import Login from './views/auth/Login';
import SignUp from './views/auth/SignUp';
import Logout from './views/auth/Logout';

import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';

import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import NavBar from './components/NavBar';


function App() {

	const [cookies, removeCookie] = useCookies([]);

	const [user, setUser] = useState(null)


	useEffect(() => {
        const verifyUser = async () => {
            if (cookies.jwt) {
                const {data} = await axios.post("http://localhost:4000", {}, {withCredentials: true});
                if (!data.status) {
					setUser(null)
                    removeCookie("jwt")
                }
                else {
					setUser(data.user)
                }
            }
        }
        verifyUser();
    }, [cookies, removeCookie])
	
	return (
		<AuthContext.Provider value={{user, setUser}}>
			{
				<Router>
          			<NavBar />
					<Routes>
						<Route exact path='/' element={<Home />} />
						<Route exact path='/login' element={<Login />} />
						<Route exact path='/signup' element={<SignUp />} />
						<Route exact path='/logout' element={<Logout />} />
					</Routes>
					<ToastContainer />
				</Router>
			}
		</AuthContext.Provider>
	);
}


export default App;
