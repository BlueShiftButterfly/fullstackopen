import { Link } from "react-router-dom";
import LocalUser from "./LocalUser";
import { useSelector } from "react-redux";
import { Group, Anchor, Flex, Container, Space, Title } from "@mantine/core";

const NavigationBar = () => {
    const userState = useSelector((state) => state.localUser);
    if (!userState.user)
        return (
            <Container size="lg">
                <Space h="sm"></Space>
                <Group justify="space-between">
                    <Flex gap="sm" justify="flex-start" align="center">
                        <Title size="h4">Blog App</Title>
                    </Flex>

                    <Flex gap="sm" justify="flex-end" align="center">
                        <LocalUser></LocalUser>
                    </Flex>
                </Group>
            </Container>
        );
    return (
        <Container size="lg">
            <Space h="sm"></Space>
            <Group justify="space-between">
                <Flex gap="sm" justify="flex-start" align="center">
                    <Title size="h4">Blog App</Title>
                    <Anchor component={Link} to="/">
                        Blogs
                    </Anchor>
                    <Anchor component={Link} to="/users">
                        Users
                    </Anchor>
                </Flex>

                <Flex gap="sm" justify="flex-end" align="center">
                    <LocalUser></LocalUser>
                </Flex>
            </Group>
        </Container>
    );
};

export default NavigationBar;
