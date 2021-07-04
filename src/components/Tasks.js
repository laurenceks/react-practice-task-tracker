import PropTypes from 'prop-types';
import Task from "./Task"

const Tasks = props => {

    return (
        <>
            {props.tasks.length > 0 ? props.tasks.map((x) => (
                <Task key={x.id} task={x} onDoubleClick={props.onDoubleClick} onDelete={props.onDelete}/>
            )) : <p className="my-3">Click "Add" to add a new task</p>}
        </>
    )
}

Tasks.propTypes = {
    tasks: PropTypes.array,
    onDoubleClick: PropTypes.func
}


Tasks.defaultProps =
    {
        tasks: [],
    }

export default Tasks;
