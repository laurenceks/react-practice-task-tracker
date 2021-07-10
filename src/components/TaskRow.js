import React from 'react';
import {FaTimes, FaBell, FaSlash} from "react-icons/fa";

const TaskRow = props => {
    return (
        <div
            className={`user-select-none position-relative my-3 ${props.task.reminder && " border-start border-primary border-5 ps-3"}`}
            key={props.task.id} style={{transition: "all 0.25s ease-out", cursor: 'pointer'}}
            onClick={props.onClick}>
            <div className="d-flex align-items-center pe-2">
                <h3 className="w-100">{props.task.title}</h3>
                <FaTimes className="text-danger me-3" style={{cursor: "pointer", width: "1rem"}}
                         onClick={(e) => {
                             e.stopPropagation();
                             props.onDelete(props.task.id)
                         }}/>
                <div className="position-relative" style={{width: "1rem", height:"1rem"}}>
                    {props.task.reminder && <FaSlash className="position-absolute top-0 left-0 w-100 h-100 text-danger"/>}
                    <FaBell className="position-absolute top-0 left-0 w-100 h-100" style={{cursor: "pointer", opacity: props.task.reminder ? 0.5 : 1}}
                            onClick={(e) => {
                                e.stopPropagation();
                                props.setReminder(props.task.id)
                            }}/></div>
            </div>
            <p>{props.task.dateTime}</p>
        </div>
    );
};
export default TaskRow;
