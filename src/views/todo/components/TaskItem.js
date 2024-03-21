import React from "react";
import {Badge, Form} from 'react-bootstrap'
import {FaPen, FaTrash, FaCalendar} from 'react-icons/fa'

import moment from "moment";

export default function TaskItem({task, setTask, markTask, deleteTask}) {

    return (
        <div className="todo_item px-4 py-2 my-3" key={task._id}>
            <div className="d-flex align-items-start" style={{ columnGap: 20 }}>
                <div>
                    <Form.Check
                        type={"checkbox"}
                        id={`default-checkbox`}
                        checked={task.isDone}
                        onClick={() => markTask(task._id)}
                    />
                </div>
                <div>
                    <h4 style={task.isDone ? { textDecoration: "line-through" } : {}}>{task.taskName}</h4>
                    <div className="d-flex align-items-center my-2" style={{ columnGap: 10 }}>
                        <FaCalendar style={{ color: "#EBECF0" }} />
                        <p className="m-0">{moment(task.dueDate).format('MMM DD YYYY h:mm A')}</p>
                    </div>
                    <div>
                        {task.isReminderSent ? <Badge pill bg="info">Overdue email reminder already sent</Badge> : ""}
                    </div>
                </div>
            </div>
            <div className="p-1 d-flex align-items-center" style={{ columnGap: 20 }}>
                <FaPen style={{ cursor: 'pointer', color: "#7D31A6" }} onClick={() => setTask(task)} />
                <FaTrash style={{ cursor: 'pointer' }} className="text-danger" onClick={() => deleteTask(task._id)} />
            </div>
        </div>
    )
}