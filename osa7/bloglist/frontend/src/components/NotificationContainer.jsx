import { Notification, Stack, Container, Affix } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { clearError, clearMessage } from "../reducers/notificationReducer";

const NotificationContainer = () => {
    const dispatch = useDispatch();
    const message = useSelector((state) => state.notification).message;
    const errorMessage = useSelector((state) => state.notification).error;

    const getMsgList = () => {
        let messages = [];
        if (errorMessage)
            messages.push({
                title: "Error",
                content: errorMessage,
                color: "red",
            });
        if (message)
            messages.push({
                title: "Info",
                content: message,
                color: "green",
            });
        return messages;
    };

    const handleClose = (title) => {
        if (title === "Error") {
            dispatch(clearError());
        }
        if (title === "Info") {
            dispatch(clearMessage());
        }
    };

    return (
        <div>
            <Affix position={{ top: 20, right: 20 }}>
                <Stack>
                    {getMsgList().map((m) => (
                        <Notification
                            key={m.title}
                            color={m.color}
                            title={m.title}
                            mt="md"
                            onClose={(e) => {
                                e.preventDefault();
                                handleClose(m.title);
                            }}
                        >
                            {m.content}
                        </Notification>
                    ))}
                </Stack>
            </Affix>
        </div>
    );
};

export default NotificationContainer;
