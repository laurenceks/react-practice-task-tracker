import {Link} from "react-router-dom";

const About = () => {
    console.log("In about")
    return (
        <div className="text-center mt-3">
            <p>Version 1.0</p>
            <p>&copy; Copyright Laurence Summers 2021. All rights reserved.</p>
            <button className="btn btn-secondary btn-small" to="/">Go back</button>
        </div>
    );
};

export default About;
