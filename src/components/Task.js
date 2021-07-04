import PropTypes from 'prop-types';
import {FaTimes} from "react-icons/fa"

const Task = props => {
    return (
        <div
            className={`user-select-none position-relative my-3 ${props.task.reminder && " border-start border-primary border-5 ps-3"}`}
            stlye={{cursor: "pointer"}}
            key={props.task.id} style={{transition: "all 0.25s ease-out"}}
            onDoubleClick={() => {
                props.onDoubleClick(props.task.id)
            }}>
            <div className="d-flex align-items-center pe-2"><h3 className="w-100">{props.task.title}</h3>
                <FaTimes className="text-danger" style={{cursor: "pointer"}}
                         onClick={() => props.onDelete(props.task.id)}/></div>
            <p>{props.task.dateTime}</p>
        </div>
    );
};

Task.propTypes = {task: PropTypes.object};

export default Task;
