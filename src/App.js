//Dependencies
import {useState, useEffect} from "react";
import {HashRouter as Router, Route} from "react-router-dom";
//Components
import Header from "./components/Header"
import Tasks from "./components/Tasks"
import Footer from "./components/Footer"
import About from "./components/About";

function App() {
    const [tasks, setTasks] = useState([])

    const userFirstName = "Laurence"

    const addTask = async (newTask) => {
        await fetch("php/insertTask.php", {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(newTask)
        }).then(getTasks);
    }

    const setReminder = async (id) => {
        await fetch("php/getTaskById.php", {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({id: id})
        }).then(res => res.json().then(x => {
            const updatedTask = {...x, reminder: !x.reminder}
            fetch("php/updateTask.php", {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(updatedTask)
            }).then(getTasks);

        }));
    }

    const deleteTask = async (id) => {
        await fetch("php/deleteTask.php", {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({id: id})
        }).then(res => {
            res.text().then(getTasks);
        });
    }

    const getTasks = async () => {
        const fetchTasks = async () => {
            const res = await fetch("php/getTasks.php", {
                method: "GET",
            })
            return await res.json();
        }
        await fetchTasks();
        const tasksFromServer = await fetchTasks()
        console.log(tasksFromServer)
        setTasks(tasksFromServer.map((x, i) => x.id ? x : {...x, id: i + 1}))
    }

    useEffect(() => {
        console.log("Rendered! home")
        getTasks()
    }, [])

    return (
        <div className="container my-3 bg-light p-3 rounded-2" style={{maxWidth: "500px"}}>
            <>
                <Header user={userFirstName} number={tasks.length} addTask={addTask}/>
                <Tasks tasks={tasks} onDoubleClick={setReminder} onDelete={deleteTask}/>
                <Footer/>
            </>
            <About/>
        </div>
    );
}

export default App;
