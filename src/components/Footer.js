import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <footer className="d-flex justify-content-center align-items-center mt-5">
            <Link className="btn btn-secondary btn-small" to="/about">About</Link>
        </footer>
    );
};

export default Footer;
