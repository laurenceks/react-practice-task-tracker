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

    const userFirstName = "User"

    const addTask = async (newTask) => {
        //manually update state to make UI change instant
        setTasks([...tasks, {...newTask, id: null}])
        //then request change in DB, and update with latest DB list
        await fetch("./php/insertTask.php", {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(newTask)
        }).then(getTasks);
    }

    const setReminder = async (id) => {
        //manually update state to make UI change instant
        setTasks(tasks.map(x=>x.id === id ? {...x, reminder: !x.reminder} : x))
        //then request change in DB, and update with latest DB list
        await fetch("./php/getTaskById.php", {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({id: id})
        }).then(res => res.json().then(x => {
            const updatedTask = {...x, reminder: !x.reminder}
            fetch("./php/updateTask.php", {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(updatedTask)
            }).then(getTasks);

        }));
    }

    const updateTask = async (updatedTask) => {
        //manually update state to make UI change instant
        setTasks(tasks.map(x=>x.id === updatedTask.id ? updatedTask : x))
        //then request change in DB, and update with latest DB list
        await fetch("./php/updateTask.php", {
            method: "post",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(updatedTask)
        }).then(getTasks)
    }

    const deleteTask = async (id) => {
        //manually update state to make UI change instant
        setTasks(tasks.filter(x => x.id !== id));
        //then request change in DB, and update with latest DB list
        await fetch("./php/deleteTask.php", {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({id: id})
        }).then(res => {
            res.text().then(getTasks);
        });
    }

    const getTasks = async () => {
        const fetchTasks = async () => {
            const res = await fetch("./php/getTasks.php", {
                method: "GET",
            })
            return await res.json();
        }
        await fetchTasks();
        const tasksFromServer = await fetchTasks()
        setTasks(tasksFromServer.map((x, i) => x.id ? x : {...x, id: i + 1}))
    }

    useEffect(() => {
        console.log("Rendered! home")
        getTasks()
    }, [])

    return (
        <Router>
            <div className="container my-3 bg-light p-3 rounded-2" style={{maxWidth: "500px"}}>
                <Header user={userFirstName} number={tasks.length} addTask={addTask}/>
                <Route path="/" exact render={() => (
                    <>
                        <Tasks tasks={tasks} setReminder={setReminder} onDelete={deleteTask} updateTask={updateTask}/>
                        <Footer/>
                    </>
                )}/>
                <Route path="/about" component={About}/>
            </div>
        </Router>
    );
}

export default App;
