import {Route} from "react-router-dom";
import Tasks from "./Tasks";
import Footer from "./Footer";
import About from "./About";
import {useEffect} from "react";

function Main({user, addTask, tasks, getTasks, setTasks, setUser}) {
    const setReminder = async (id) => {
        //manually update state to make UI change instant
        setTasks(tasks.map(x => x.id === id ? {...x, reminder: !x.reminder} : x))
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
        setTasks(tasks.map(x => x.id === updatedTask.id ? updatedTask : x))
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

    useEffect(() => {
        getTasks()
    }, [])

    return (
        <>
            <Route path="/" exact render={() => (
                <>
                    <Tasks tasks={tasks} setReminder={setReminder} onDelete={deleteTask} updateTask={updateTask}/>
                    <Footer setUser={setUser} setTasks={setTasks} user={user}/>
                </>
            )}/>
            <Route path="/about" component={About}/>
        </>
    );
}

export default Main;