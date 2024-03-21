import React, {useContext, useEffect, useState} from "react";

import {Row, Container, Col} from 'react-bootstrap'

import AddTask from "./components/AddTask";
import TaskItem from "./components/TaskItem";

import AuthContext from "../../AuthContext";

import {API_URL} from '../../utils/API';
import {showSuccessToast, showErrorToast} from '../../utils/toastUtils';

import axios from "axios";

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
					setTasks((prev) => data.created ? [...prev, data.data] : prev.map((item) => item._id === task._id ? data.data : item))
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

    const markTask = async (taskId) => {
        try {
            const {data} = await axios.post(`${API_URL}/marktask`, {
				taskId: taskId
            }, {withCredentials: true})
            if(data) {
				if (data.success) {
                    let markedTask = data.data
					showSuccessToast("Marked successfully");
					setTasks((prev) => prev.map(t => t._id === taskId ? markedTask : t))
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
                                t &&
                                <TaskItem 
                                    key={t._id} 
                                    task={t} 
                                    setTask={setTask} 
                                    markTask={markTask} 
                                    deleteTask={deleteTask} 
                                />
                            )
                        }
                    </div>
                </Col>
            </Row>
        </Container>
    )
}