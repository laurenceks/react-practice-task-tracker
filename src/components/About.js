import {Link} from "react-router-dom";

const About = () => {
    console.log("In about")
    return (
        <div className="text-center mt-3">
            <p>Version 1.0</p>
            <p>&copy; Copyright Laurence Summers 2021. All rights reserved.</p>
            <Link className="btn btn-secondary btn-small mt-5" to="/">Go back</Link>
        </div>
    );
};

export default About;
