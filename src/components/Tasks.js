import PropTypes from 'prop-types';
import Task from "./Task"

const Tasks = props => {
    return (
        <>
            {props.tasks.length > 0 ? props.tasks.map((x) => (
                <Task key={x.id} task={x} setReminder={props.setReminder} onDelete={props.onDelete} updateTask={props.updateTask}/>
            )) : <p className="my-3">Click "Add" to add a new task</p>}
        </>
    )
}

Tasks.propTypes = {
    tasks: PropTypes.array,
    setReminder: PropTypes.func
}


Tasks.defaultProps =
    {
        tasks: [],
    }

export default Tasks;
