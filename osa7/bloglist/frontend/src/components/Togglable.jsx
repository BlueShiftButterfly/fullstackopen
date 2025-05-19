import { useState, useImperativeHandle, forwardRef } from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "@mantine/core";

const Togglable = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => {
        setVisible(!visible);
    };
    const open = () => {
        setVisible(true);
    };
    const close = () => {
        setVisible(false);
    };

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility,
        };
    });

    return (
        <div>
            <Modal
                opened={visible}
                onClose={close}
                title={props.buttonLabel}
                size="lg"
            >
                {props.children}
            </Modal>
            <Button onClick={open}>{props.buttonLabel}</Button>
        </div>
    );
});

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
};

Togglable.displayName = "Togglable";

export default Togglable;
