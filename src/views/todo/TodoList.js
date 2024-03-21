import React, {useContext, useEffect, useState} from "react";

import {Row, Container, Col, Card} from 'react-bootstrap'

import AddTask from "./components/AddTask";
import AuthContext from "../../AuthContext";

import {API_URL} from '../../utils/API';
import {showSuccessToast, showErrorToast} from '../../utils/toastUtils';

import axios from "axios";

import {FaPen, FaTrash} from 'react-icons/fa'

export default function TodoList() {

    const {user} = useContext(AuthContext)
    const [tasks, setTasks] = useState([])

    const [task, setTask] = useState(null)

    useEffect(() => {
        async function getTasks() {
			if (user) {
				const {data} = await axios.get(`${API_URL}/tasks/${user.id}`, {withCredentials: true})
				setTasks(data.tasks)
			}
		}
		getTasks();
    }, [user])

    const updateTask = async (id, taskName, dueDate) => {
        let updatedTask = {_id: id, taskName, dueDate} 
        setTask(updatedTask) 
		try {
            const {data} = await axios.post(`${API_URL}/tasks`, {
                task: updatedTask,
				userId: user.id
            }, {withCredentials: true})
            if(data) {
				if (data.success) {
					showSuccessToast("Saved successfully");
					setTask(null)
					setTasks((prev) => data.created ? [...prev, data.data] : prev.map((item) => item._id === task._id ? updatedTask : item))
				}
				else {
					showErrorToast(data.message)
				}
			}
		}
		catch(err) {
			showErrorToast(err)
		}
    }

    return (
        <Container fluid>
            <Row className="justify-content-center">
                <Col xl={8} className="my-4">
                    <h2 className="text-center">Todo</h2>
                    <AddTask task={task} updateTask={updateTask} />
                    <div className="my-4">
                        {
                            tasks.map(t => 
                                <div className="todo_item px-4 py-2 my-3" key={t._id}>
                                    <div className="d-flex align-items-center" style={{columnGap: 20}}>
                                        <h3>{t.taskName}</h3>
                                        <div>
                                            
                                        </div>
                                    </div>
                                    <div className="p-1 d-flex align-items-center" style={{columnGap: 20}}>
                                        <FaPen style={{cursor: 'pointer', color: "#7D31A6"}}  onClick={() => setTask(t)}/>
                                        <FaTrash style={{cursor: 'pointer'}} className="text-danger" />
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </Col>
            </Row>
        </Container>
    )
}