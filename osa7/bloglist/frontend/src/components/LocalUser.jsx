import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/localUserReducer";

const LocalUser = () => {
    const dispatch = useDispatch();
    const userState = useSelector((state) => state.localUser);

    const handleLogout = async (event) => {
        event.preventDefault();
        dispatch(logout());
    };
    if (!userState.user) return null;
    return (
        <p>
            {userState.user.name} <button onClick={handleLogout}>Logout</button>
        </p>
    );
};

export default LocalUser;
