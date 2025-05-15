import { useEffect } from "react";
import Notification from "./components/Notification";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import LoginForm from "./components/LoginForm";
import { initializeLocalUser } from "./reducers/localUserReducer";
import LocalUser from "./components/LocalUser";
import { initializeUsers } from "./reducers/userReducer";
import UserList from "./components/UserList";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import UserView from "./components/UserView";
import BlogView from "./components/BlogView";
import NavigationBar from "./components/NavigationBar";

const App = () => {
    const dispatch = useDispatch();
    const userState = useSelector((state) => state.localUser);

    useEffect(() => {
        dispatch(initializeLocalUser());
        dispatch(initializeBlogs());
        dispatch(initializeUsers());
    }, [dispatch]);

    const requireAuth = (element) => {
        if (userState.isInitialized === false) {
            return <p></p>;
        }
        if (userState.user) {
            return element;
        }
        return <Navigate replace to={"/login"}></Navigate>;
    };

    const getLoginNavigation = () => {
        if (userState.isInitialized === false) {
            return <p></p>;
        }
        if (!userState.user) {
            return <LoginForm></LoginForm>;
        }
        return <Navigate replace to={"/"}></Navigate>;
    };

    return (
        <div>
            <Notification></Notification>
            <NavigationBar></NavigationBar>
            <Routes>
                <Route path="/login" element={getLoginNavigation()}></Route>
                <Route
                    path="/blogs/:id"
                    element={requireAuth(<BlogView></BlogView>)}
                ></Route>
                <Route
                    path="/users/:id"
                    element={requireAuth(<UserView></UserView>)}
                ></Route>
                <Route
                    path="/users"
                    element={requireAuth(<UserList></UserList>)}
                ></Route>
                <Route path="/" element={requireAuth(<Home></Home>)}></Route>
            </Routes>
        </div>
    );
};

export default App;
