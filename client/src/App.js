import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import PrivateRoute from "./components/PrivateRoute"
import LoginScreen from "./screens/LoginScreen"
import RegisterScreen from "./screens/RegisterScreen"
import HomeScreen from "./screens/HomeScreen"
import ChatScreen from "./screens/chat/ChatScreen"
import socketClient  from "socket.io-client";
const SERVER = "http://localhost:5000/";
const App = () => {
  var socket = socketClient(SERVER,{
    withCredentials: false,
});
  socket.on('connection', () => {
      console.log(`I'm connected with the back-end`);
  });
  return (
      <Router>
        <div className="App">
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route  path="/register" component={RegisterScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/chat" component={ChatScreen}/>
        </Switch>
        </div>
      </Router>
  );
};

export default App;
