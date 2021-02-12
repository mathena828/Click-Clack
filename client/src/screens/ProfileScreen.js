import { useContext } from "react";
import { UserContext } from "../App";
const ProfileScreen = ({ history }) => {
    const [user, setUser] = useContext(UserContext);
    return (
      <div>
        <h1>Profile</h1>
      </div>
    );
  };
  
  export default ProfileScreen;