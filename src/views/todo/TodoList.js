import React, {useContext, useEffect, useState} from "react";

import {Row, Container, Col, Badge} from 'react-bootstrap'

import AddTask from "./components/AddTask";
import AuthContext from "../../AuthContext";

import {API_URL} from '../../utils/API';
import {showSuccessToast, showErrorToast} from '../../utils/toastUtils';

import axios from "axios";

import {FaPen, FaTrash, FaCalendar} from 'react-icons/fa'

import moment from "moment";

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

    const deleteTask = async (taskId) => {
        try {
            const {data} = await axios.post(`${API_URL}/deletetask`, {
				taskId: taskId
            }, {withCredentials: true})
            if(data) {
				if (data.success) {
					showSuccessToast("Deleted successfully");
					setTask(null)
					setTasks((prev) => prev.filter(t => t._id !== taskId))
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
                    <h2 className="text-center">Todo List</h2>
                    <AddTask task={task} updateTask={updateTask} />
                    <div className="my-4">
                        {
                            tasks.map(t => 
                                <div className="todo_item px-4 py-2 my-3" key={t._id}>
                                    <div>
                                        <h4>{t.taskName}</h4>
                                        <div className="d-flex align-items-center my-2" style={{columnGap: 10}}>
                                            <FaCalendar style={{color: "#EBECF0"}} /> 
                                            <p className="m-0">{moment(t.dueDate).format('MMM DD YYYY h:mm A')}</p>
                                        </div>
                                        <div>
                                            {t.isReminderSent ? <Badge pill bg="info">Overdue email reminder already sent</Badge> : ""}
                                        </div>
                                    </div>
                                    <div className="p-1 d-flex align-items-center" style={{columnGap: 20}}>
                                        <FaPen style={{cursor: 'pointer', color: "#7D31A6"}}  onClick={() => setTask(t)}/>
                                        <FaTrash style={{cursor: 'pointer'}} className="text-danger" onClick={() => deleteTask(t._id)} />
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