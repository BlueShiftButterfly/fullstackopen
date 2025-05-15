import { useDispatch } from "react-redux";
import { useField } from "../hooks";
import { login } from "../reducers/localUserReducer";

const LoginForm = () => {
    const username = useField("text");
    const password = useField("password");

    const dispatch = useDispatch();

    const handleLogin = (event) => {
        event.preventDefault();
        dispatch(login(username.value, password.value));
        username.reset();
        password.reset();
    };

    return (
        <div>
            <h2>Log in to application</h2>
            <form onSubmit={handleLogin}>
                <div>
                    Username
                    <input {...username} reset="" data-testid="username" />
                </div>
                <div>
                    Password
                    <input {...password} reset="" data-testid="password" />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
