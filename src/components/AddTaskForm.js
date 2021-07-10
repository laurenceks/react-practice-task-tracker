import PropTypes from 'prop-types';
import {useState} from "react";

const AddTaskForm = props => {
    const [title, setTitle] = useState("");
    const [dateTime, setDateTime] = useState("");
    const [reminder, setReminder] = useState(false);

    const createDateTimeString = (x) => {
        setDateTime(`${x.date ? x.date : document.getElementById("iDate").value} ${x.time ? x.time : document.getElementById("iTime").value}`)
    }

    return (
        <form
            className="mb-3"
            onSubmit={(e) => {
                e.preventDefault();
                console.log("Submit!")
                props.setAddTaskFormIsShown();
                props.addTask({title, dateTime, reminder});
            }}>
            <div className="mb-3">
                <label className="form-label">
                    Title
                    <input className="form-control mt-2" type="text" placeholder="Task title"
                           onChange={(e) => setTitle(e.target.value)}/>
                </label>
            </div>
            <div className="mb-3">
                <label className="form-label">
                    Day
                    <input id="iDate" className="form-control mt-2" type="date"
                           onChange={(e) => createDateTimeString({date: e.target.value})}/>
                </label>
            </div>
            <div className="mb-3">
                <label className="form-label">
                    Time
                    <input id="iTime" className="form-control mt-2" type="time"
                           onChange={(e) => createDateTimeString({time: e.target.value})}/>
                </label>
            </div>
            <div className="mb-3">
                <label className="form-check-label">
                    Set reminder?
                    <input className="form-check-input mx-2" type="checkbox"
                           onChange={(e) => setReminder(e.currentTarget.checked)}/>
                </label>
            </div>

            <input className="btn btn-success d-block w-100" type="submit" value="Add task"/>
        </form>
    );
};

AddTaskForm.propTypes = {
    setAddTaskFormIsShown: PropTypes.bool,
    addTask: PropTypes.func
};

export default AddTaskForm;
