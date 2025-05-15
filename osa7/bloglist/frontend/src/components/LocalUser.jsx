import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/localUserReducer";

const LocalUser = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.localUser);

    const handleLogout = async (event) => {
        event.preventDefault();
        dispatch(logout());
    };
    return (
        <p>
            {user.name} <button onClick={handleLogout}>Logout</button>
        </p>
    );
};

export default LocalUser;
