interface NotificationProps {
    message: string
}

export const Notification = (props: NotificationProps) => {
    const style = {
        border: "solid",
        padding: 10,
        borderWidth: 1,
        marginBottom: 5,
        color: "red"
    };
  
    if (!props.message) return null;

    return (
        <div style={style}>
            {props.message}
        </div>
    );
};
