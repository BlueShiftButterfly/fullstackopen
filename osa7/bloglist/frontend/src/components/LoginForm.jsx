import { useDispatch } from "react-redux";
import { useField } from "../hooks";
import { login } from "../reducers/localUserReducer";
import {
    Button,
    Container,
    PasswordInput,
    Space,
    Stack,
    TextInput,
    Title,
} from "@mantine/core";
import { getHotkeyHandler } from "@mantine/hooks";

const LoginForm = () => {
    const username = useField("text");
    const password = useField("password");

    const dispatch = useDispatch();

    const handleLogin = (event) => {
        if (event) event.preventDefault();
        dispatch(login(username.value, password.value));
        username.reset();
        password.reset();
    };

    return (
        <div>
            <Space h="xl"></Space>
            <Container size="xs">
                <Stack justify="center" align="stretch">
                    <Title>Login to application</Title>
                    <Space></Space>
                    <TextInput
                        {...username}
                        reset=""
                        placeholder="Enter your username"
                        label="Username"
                        onKeyDown={getHotkeyHandler([["Enter", handleLogin]])}
                    ></TextInput>
                    <PasswordInput
                        {...password}
                        reset=""
                        placeholder="Enter your password"
                        label="Password"
                        onKeyDown={getHotkeyHandler([["Enter", handleLogin]])}
                    ></PasswordInput>
                    <Button onClick={handleLogin}>Login</Button>
                </Stack>
            </Container>
        </div>
    );
};

export default LoginForm;
