import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <footer className="d-flex justify-content-center align-items-center mt-5">
            <button className="btn btn-secondary btn-small" to="/about">About</button>
        </footer>
    );
};

export default Footer;
