import PropTypes from 'prop-types';
import {useState} from "react";
import {Link, Route, useLocation} from "react-router-dom";
import TaskForm from "./TaskForm";

const Header = props => {
    const l = useLocation();
    const [addTaskFormIsShown, setAddTaskFormIsShown] = useState(l.pathname==="/add");
    const addBtnClick = () => {
        setAddTaskFormIsShown(() => !(l.pathname==="/add"))
    }
    return (
        <header className="mb-5">
            <div className="d-flex align-items-center">
                <h1 className="w-100">Task Tracker</h1>
                {l.pathname !== "/about" && <Link to={`${addTaskFormIsShown ? "/" : "/add"}`} onClick={addBtnClick}
                       className={`btn ${!addTaskFormIsShown ? "btn-primary" : "btn-danger"}`}
                       style={{justifySelf: "end"}}>{addTaskFormIsShown ? "Cancel" : "Add"}</Link>}
            </div>
            <Route path="/add" render={() => (
                <TaskForm onSubmit={props.addTask} hideForm={addBtnClick} buttonText={"Add task"}/>)}/>
            {(!addTaskFormIsShown && l.pathname !== "/about") &&
            <p>Hi, {props.user}. You have {props.number} task{props.number !== 1 && "s"} in your list.</p>}
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