import { useState, createContext} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Container } from "react-bootstrap";
import PrivateRoute from "./components/PrivateRoute"
import LoginScreen from "./screens/LoginScreen"
import RegisterScreen from "./screens/RegisterScreen"
import HomeScreen from "./screens/HomeScreen"
import ChatScreen from "./screens/chat/ChatScreen"
import ProfileScreen from "./screens/ProfileScreen"
import NavigationBar from "./components/NavigationBar"
import JoinScreen from "./screens/JoinScreen";

export const UserContext = createContext();

const App = () => {
  const userState = useState(null);
  return (
      <Router>
        <div className="App">
          <UserContext.Provider value={userState}>
            <NavigationBar></NavigationBar>
            <Switch>
              <Route exact path="/" component={HomeScreen} />
              <Route  path="/register" component={RegisterScreen} />
              <Route path="/login" component={LoginScreen} />
              <PrivateRoute path="/chat" component={ChatScreen}/>
              <PrivateRoute path="/profile" component={ProfileScreen}/>
              <PrivateRoute path="/join" component={JoinScreen}/>
            </Switch>
          </UserContext.Provider>
        </div>
      </Router>
  );
};

export default App;
