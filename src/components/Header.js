import PropTypes from 'prop-types';
import {useState} from "react";
import AddTaskForm from "./AddTaskForm";

const Header = props => {
    const [addTaskFormIsShown, setAddTaskFormIsShown] = useState(false);
    const addBtnClick = () => {
        setAddTaskFormIsShown(() => !addTaskFormIsShown)
    }
    console.log("In the header!")
    return (
        <header className="mb-5">
            <div className="d-flex align-items-center">
                <h1 className="w-100">Task Tracker</h1>
                <button onClick={addBtnClick} className={`btn ${!addTaskFormIsShown ? "btn-primary" : "btn-danger"}`} style={{justifySelf: "end"}}>{addTaskFormIsShown ? "Cancel" : "Add"}</button>
            </div>
            {addTaskFormIsShown && <AddTaskForm addTask={props.addTask} setAddTaskFormIsShown={setAddTaskFormIsShown}/>}
            <p>Hi, {props.user}. You have {props.number} task{props.number !== 1 && "s"} in your list.</p>
        </header>
    );
};

Header.defaultProps = {
    tasks: []
}

Header.propTypes = {
    tasks: PropTypes.array
};

export default Header;