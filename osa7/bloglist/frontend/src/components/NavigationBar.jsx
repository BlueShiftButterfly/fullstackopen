import { Link } from "react-router-dom";
import LocalUser from "./LocalUser";
import { useSelector } from "react-redux";

const NavigationBar = () => {
    const userState = useSelector((state) => state.localUser);
    if (!userState.user) return null;
    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <Link to="/">blogs</Link>
                        </td>
                        <td>
                            <Link to="/users">users</Link>
                        </td>
                        <td>
                            <LocalUser></LocalUser>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default NavigationBar;
