import PropTypes from 'prop-types';
import {useState} from "react";
import {useHistory} from "react-router-dom";

const Login = ({setUser}) => {
    const [tempUser, setTempUser] = useState("");
    const [remember, setRemember] = useState(false);
    const h = useHistory();
    return (
        <div>
            <p>Welcome to the task tracker app. To get started, please log in.</p>
            <form
                className="mb-3 needs-validation"
                onSubmit={(e) => {
                    e.preventDefault();
                    if (tempUser && tempUser !== "") {
                        setUser(tempUser);
                        if (remember) {
                            const cDate = new Date();
                            cDate.setHours(cDate.getHours() + 24);
                            document.cookie = `user=${tempUser}; expires=${cDate.toUTCString()}; path="/"`
                        }
                        h.push("/");
                    }
                }}>
                <div className="mb-3">
                    <label className="form-label">
                        Username
                        <input onChange={(e) => {
                            setTempUser(e.target.value)
                        }} className="form-control mt-2" type="text" placeholder="User"/>
                    </label>
                </div>
                <div className="mb-3">
                    <label className="form-check-label">
                        Remember me
                        <input className="form-check-input mx-2" type="checkbox"
                               onChange={(e) => {
                                   setRemember(e.currentTarget.checked)
                               }}/>
                    </label>
                    <p className="small text-muted"><small>By ticking this box you are agreeing to a cookie being stored
                        on your computer for 24 hours to remember your login</small></p>
                </div>
                <input className="btn btn-success d-block w-100" type="submit" value={"Login"}/>
            </form>
        </div>
    );
};

Login.propTypes = {
    setUser: PropTypes.func
};

export default Login;
