import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/localUserReducer";
import { Avatar, Button, Flex, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const LocalUser = () => {
    const dispatch = useDispatch();
    const userState = useSelector((state) => state.localUser);
    const usersState = useSelector((state) => state.users);
    const navigate = useNavigate();

    const handleLogout = async (event) => {
        event.preventDefault();
        dispatch(logout());
    };

    const gotoProfile = async (event) => {
        event.preventDefault();
        const id = usersState.find(
            (u) => u.username === userState.user.username,
        ).id;
        navigate(`/users/${id}`);
    };

    if (!userState.user)
        return (
            <Flex justify="center" align="center" direction="row" gap="sm">
                <Avatar radius="xl"></Avatar>
                <Text>User logged out</Text>
            </Flex>
        );
    return (
        <Flex justify="center" align="center" direction="row" gap="sm">
            <Avatar radius="xl" name={userState.user.name}></Avatar>
            <Button variant="default" onClick={gotoProfile}>
                {userState.user.name}
            </Button>
            <Button onClick={handleLogout}>Logout</Button>
        </Flex>
    );
};

export default LocalUser;
