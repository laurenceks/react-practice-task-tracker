import PropTypes from 'prop-types';
import {useState} from "react";
import TaskForm from "./TaskForm";
import TaskRow from "./TaskRow";

const Task = props => {
    const [beingEdited, setBeingEdited] = useState(false);
    return (
        <>
            {beingEdited ? <TaskForm task={props.task} hideForm={() => {
                    setBeingEdited(false)
                }} onSubmit={props.updateTask}/>
                :
                <TaskRow task={props.task}
                         onDelete={props.onDelete}
                         setReminder={props.setReminder}
                         onClick={() => {
                             setBeingEdited(true)
                         }}

                />
            }
        </>
    )
};

Task.propTypes = {
    task: PropTypes.object
};

export default Task;
