import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { CookiesProvider } from 'react-cookie';

import PrivateRoute from "./components/PrivateRoute"
import LoginScreen from "./screens/LoginScreen"
import RegisterScreen from "./screens/RegisterScreen"
import HomeScreen from "./screens/HomeScreen"
import ChatScreen from "./screens/chat/ChatScreen"
import ProfileScreen from "./screens/ProfileScreen"
import NavigationBar from "./components/NavigationBar"
import JoinScreen from "./screens/JoinScreen";

const App = () => {
  return (
    <CookiesProvider>
      <Router>
          <NavigationBar></NavigationBar>
          <Switch>
            <Route exact path="/" component={HomeScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/login" component={LoginScreen} />
            <PrivateRoute path="/chat" component={ChatScreen} />
            <PrivateRoute path="/profile" component={ProfileScreen} />
            <PrivateRoute path="/join" component={JoinScreen} />
          </Switch>
      </Router>
    </CookiesProvider>
  );
};

export default App;
