import {Link} from "react-router-dom";

const Footer = ({setUser, setTasks, user}) => {
    return (
        <footer className="d-flex justify-content-center align-items-center mt-5">
            <Link className="btn btn-secondary btn-small mx-2" to="/about">About</Link>
            <Link className="btn btn-secondary btn-small mx-2" to="/login" onClick={ () => {
                setUser(null);
                document.cookie = `user=${user}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path="/"`
                setTasks([]);
            }}>Log out</Link>
        </footer>
    );
};

export default Footer;
