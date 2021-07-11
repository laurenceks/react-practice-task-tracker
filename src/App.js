//Dependencies
import {useState, useEffect} from "react";
import {HashRouter as Router, Route, Switch, Redirect} from "react-router-dom";
//Components
import Main from "./components/Main";
import Header from "./components/Header";
import Login from "./components/Login"

function App() {
    let userCookie = decodeURIComponent(document.cookie).match(/user=([\S ]+?);|user=([\S ]+?)$/)
    if(userCookie){
        userCookie = userCookie.filter( (x) => {
            return x && x !== document.cookie;
        })[0];
    }
    const [user, setUser] = useState(!userCookie || userCookie === "" ? null : userCookie);
    const [tasks, setTasks] = useState([])
    const addTask = async (newTask) => {
        //manually update state to make UI change instant
        setTasks([...tasks, {...newTask, id: null}])
        //then request change in DB, and update with latest DB list
        await fetch("./php/insertTask.php", {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({...newTask, user: user})
        }).then(getTasks);
    }
    const getTasks = async () => {
        const fetchTasks = async () => {
            const res = await fetch("./php/getTasks.php", {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({user: user})
            })
            return await res.json();
        }
        await fetchTasks();
        const tasksFromServer = await fetchTasks()
        setTasks(tasksFromServer.map((x, i) => x.id ? x : {...x, id: i + 1}))
    }

    return (
        <Router>
            <div className="container my-3 bg-light p-3 rounded-2" style={{maxWidth: "500px"}}>
                <Header user={user} number={tasks.length} addTask={addTask} setTasks={setTasks} tasks={tasks}/>
                <Switch>
                    <Route path="/login">
                        <Login setUser={setUser}/>
                    </Route>
                    <Route path="/" render={() => (
                        user ?
                            <Main user={user} addTask={addTask} getTasks={getTasks} setTasks={setTasks} tasks={tasks}
                                  setUser={setUser}/>
                            :
                            <Redirect to="/login"/>
                    )}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
