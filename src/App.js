//Dependencies
import {useState, useEffect} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
//Components
import Header from "./components/Header"
import Tasks from "./components/Tasks"
import Footer from "./components/Footer"
import About from "./components/About";

function App() {
    const [tasks, setTasks] = useState([])

    const userFirstName = "Laurence"

    const addTask = async (newTask) => {
        await fetch("http://localhost:5000/tasks/", {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(newTask)
        }).then(getTasks);
    }

    const setReminder = async (id) => {
        await fetch("http://localhost:5000/tasks/" + id, {method: "GET"}).then(res => res.json().then(x => {
            const updatedTask = {...x, reminder: !x.reminder};
            fetch("http://localhost:5000/tasks/" + id, {
                method: "PUT", headers: {
                    "Content-type": "Application/json"
                }, body: JSON.stringify(updatedTask)
            }).then(getTasks)
        }));
    }

    const deleteTask = async (id) => {
        await fetch("http://localhost:5000/tasks/" + id, {method: "DELETE"}).then(getTasks);
    }

    const getTasks = async () => {
        const fetchTasks = async () => {
            const res = await fetch("http://localhost:5000/tasks")
            return await res.json();
        }
        const tasksFromServer = await fetchTasks()
        setTasks(tasksFromServer.map((x, i) => x.id ? x : {...x, id: i + 1}))
    }

    useEffect(() => {
        getTasks()
    }, [])

    return (
        <Router>
            <div className="container my-3 bg-light p-3 rounded-2" style={{maxWidth: "500px"}}>
                <Route path="/" exact render={(props) => (
                    <>
                        <Header user={userFirstName} number={tasks.length} addTask={addTask}/>
                        <Tasks tasks={tasks} onDoubleClick={setReminder} onDelete={deleteTask}/>
                        <Footer/>
                    </>
                )}/>
                <Route path="/about" component={About}/>
            </div>
        </Router>
    );
}

export default App;
