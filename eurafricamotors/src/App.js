import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from "./pages/Home"
import Login from "./pages/Login"
import AddNewCar from "./pages/AddNewCar"
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/add">
            <AddNewCar />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;