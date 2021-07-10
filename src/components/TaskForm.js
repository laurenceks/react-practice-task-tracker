import PropTypes from 'prop-types';
import {useState} from "react";
import {useHistory} from "react-router-dom";

const TaskForm = props => {
    const [title, setTitle] = useState(props.task.title || "");
    const [dateTime, setDateTime] = useState(props.task.dateTime || "");
    const [reminder, setReminder] = useState(props.task.reminder || false);
    const id = props.task.id || null;
    const h = useHistory();
    const createDateTimeString = (x) => {
        setDateTime(`${x.date ? x.date : document.getElementById("iDate").value} ${x.time ? x.time : document.getElementById("iTime").value}`)
    }

    return (
        <form
            className="mb-3 needs-validation"
            onSubmit={(e) => {
                e.preventDefault();
                let formIsValid = true;
                const invalidInputs = [];

                document.querySelectorAll("input, textarea").forEach(x => {
                    if (x.type !== "submit" && (!x.value || x.value === "")) {
                        invalidInputs.push(x);
                        formIsValid = false;
                        x.classList.add("is-invalid");
                    } else if (x.type !== "text" && x.type !== "textarea" && x.type !== "submit" && x.type !== "checkbox") {
                        let exp = /regex/;
                        if (x.type === "email") {
                            exp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        } else if (x.type === "tel") {
                            exp = /^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$|\+[0-9]{1,3} ?[0-9 ]{1,15}/;
                        } else if (x.type === "date") {
                            //yyyy-mm-dd format
                            exp = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
                        } else if (x.type === "time") {
                            //HH:mm format
                            exp = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
                        }
                        if (!exp.test(x.value)) {
                            x.classList.add("is-invalid");
                            invalidInputs.push(x);
                            formIsValid = false;
                        } else {
                            x.classList.remove("is-invalid");
                        }
                    } else {
                        x.classList.remove("is-invalid");
                    }
                });

                if (formIsValid) {
                    props.hideForm();
                    props.onSubmit({title: title, dateTime: dateTime, reminder: reminder, id: id || null});
                    e.target.reset();
                    h.push("/")
                }
            }}>
            <div className="mb-3">
                <label className="form-label">
                    Title
                    <input className="form-control mt-2" type="text" placeholder="Task title" defaultValue={title}
                           onChange={(e) => setTitle(e.target.value)}/>
                </label>
            </div>
            <div className="mb-3">
                <label className="form-label">
                    Day
                    <input id="iDate" className="form-control mt-2" type="date" defaultValue={dateTime.substr(0, 10)}
                           onChange={(e) => createDateTimeString({date: e.target.value})}/>
                </label>
            </div>
            <div className="mb-3">
                <label className="form-label">
                    Time
                    <input id="iTime" className="form-control mt-2" type="time"
                           onChange={(e) => createDateTimeString({time: e.target.value})}
                           defaultValue={dateTime.substr(11, 5)}/>
                </label>
            </div>
            <div className="mb-3">
                <label className="form-check-label">
                    Set reminder?
                    <input className="form-check-input mx-2" type="checkbox" checked={reminder}
                           onChange={(e) => setReminder(e.currentTarget.checked)}/>
                </label>
            </div>
            <input className="btn btn-success d-block w-100" type="submit" defaultValue={props.buttonText}/>
        </form>
    );
};

TaskForm.propTypes = {
    hideForm: PropTypes.func,
    onSubmit: PropTypes.func
};

TaskForm.defaultProps = {
    buttonText: "Save",
    task: {
        id: null,
        title: "",
        dateTime: "",
        reminder: false
    },
    onSubmit: () => {
        console.warn("Task form submitted with no callback")
    }
}

export default TaskForm;
