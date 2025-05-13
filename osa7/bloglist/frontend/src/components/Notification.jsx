import { useSelector } from "react-redux";

const Notification = () => {
    const message = useSelector((state) => state.notification).message;
    const errorMessage = useSelector((state) => state.notification).error;

    if (message === null && errorMessage === null) {
        return null;
    }
    if (message) {
        return <div className="notification">{message}</div>;
    }
    return <div className="error">{errorMessage}</div>;
};

export default Notification;
