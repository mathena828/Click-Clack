import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import PrivateRoute from "./components/PrivateRoute"
import LoginScreen from "./screens/LoginScreen"
import RegisterScreen from "./screens/RegisterScreen"
import HomeScreen from "./screens/HomeScreen"

const App = () => {
  return (
      <Router>
        <div className="App">
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route  path="/register" component={RegisterScreen} />
          <Route path="/login" component={LoginScreen} />
        </Switch>
        </div>
      </Router>
  );
};

export default App;
