import { useSelector } from "react-redux";

const ErrorNotification = () => {
    const message = useSelector((state) => state.notification).error;
    if (message === null) {
        return null;
    }
    return <div className="error">{message}</div>;
};

export default ErrorNotification;
