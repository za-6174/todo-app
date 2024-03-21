import { useEffect, useState } from "react";
import { Col, Form, Row, Button } from "react-bootstrap";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AddTask({task, updateTask}) {

    const [taskId, setTaskId] = useState("")
    const [taskName, setTaskName] = useState("")
    const [dueDate, setDueDate] =  useState("")

    const [errors, setErrors] = useState({taskName: "", dueDate: ""})

    useEffect(() => {
        if (task) {
            setTaskId(task._id)
            setTaskName(task.taskName)
            setDueDate(task.dueDate)
        }
        else {
            setTaskId("")
            setTaskName("")
            setDueDate("")
        }
    }, [task])

    const addTask = (e) => {
        e.preventDefault();
        updateTask(taskId, taskName, dueDate)
    }
    
    const validateForm = () => Object.keys(errors).length === 0

    const handleErrors = (key, value) => {
        let isValid = true;
        if (value === "") {
            setErrors({ ...errors, [key]: `${key} cannot be empty` })
            isValid = false
        }
        if (isValid) {
            const newErrors = { ...errors };
            delete newErrors[key];
            setErrors(newErrors);
        }
    }

    return (
        <Form onSubmit={addTask}>
            <Row>
                <Col xl={5}>
                    <Form.Group id="taskName" className="my-2">
                        <Form.Label>Task Name</Form.Label>
                        <Form.Control
                            value={taskName}
                            type="text"
                            placeholder="Task Name"
                            onKeyUp={() => handleErrors("taskName")}
                            onChange={(e) => setTaskName(e.target.value)}
                            required
                        />
                    </Form.Group>
                </Col>
                <Col xl={5}>
                    <Form.Group id="taskName" className="my-2">
                        <Form.Label>Due Date</Form.Label><br />
                        <DatePicker 
                            selected={dueDate} 
                            onChange={(date) => { setDueDate(date); handleErrors("dueDate") }} className='form-control w-100' 
                        />
                    </Form.Group>
                </Col>
                <Col xl={2} className="align-self-end">
                    <Button variant="success" type="submit" className="my-2" disabled={!validateForm()}>
                        Save Task
                    </Button>
                </Col>
            </Row>
        </Form>
    )
}