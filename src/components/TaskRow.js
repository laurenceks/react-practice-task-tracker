import React from 'react';
import {FaTimes, FaBell} from "react-icons/fa";

const TaskRow = props => {
    return (
        <div
            className={`user-select-none position-relative my-3 ${props.task.reminder && " border-start border-primary border-5 ps-3"}`}
            key={props.task.id} style={{transition: "all 0.25s ease-out", cursor: 'pointer'}}
            onClick={props.onClick}>
            <div className="d-flex align-items-center pe-2">
                <h3 className="w-100">{props.task.title}</h3>
                <FaTimes className="text-danger me-3" style={{cursor: "pointer"}}
                         onClick={(e) => {
                             e.stopPropagation();
                             props.onDelete(props.task.id)
                         }}/>
                <FaBell className="" style={{cursor: "pointer"}}
                         onClick={(e) => {
                             e.stopPropagation();
                             props.setReminder(props.task.id)
                         }}/>
            </div>
            <p>{props.task.dateTime}</p>
        </div>
    );
};
export default TaskRow;
