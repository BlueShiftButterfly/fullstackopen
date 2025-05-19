import {
    Anchor,
    Avatar,
    Button,
    Divider,
    Flex,
    Space,
    Stack,
    Text,
    Title,
} from "@mantine/core";
import { useSelector } from "react-redux";
import { Link, useMatch } from "react-router-dom";

const UserView = () => {
    const users = useSelector((state) => state.users);
    const match = useMatch("users/:id");
    const user = match ? users.find((u) => u.id === match.params.id) : null;
    if (!user) return null;
    return (
        <div>
            <Flex justify="flex-start" align="center" direction="row" gap="sm">
                <Avatar size="lg" radius="xl" name={user.name}></Avatar>
                <Title>{user.name}</Title>
            </Flex>
            <Space h="lg"></Space>
            <Divider></Divider>
            <Space h="lg"></Space>
            <Title order={3}>{user.name}'s blogs</Title>
            <Space h="md"></Space>
            {user.blogs.map((blog) => (
                <Stack key={blog.id}>
                    <Space h="sm"></Space>
                    <Anchor component={Link} to={`/blogs/${blog.id}`}>
                        {blog.title} by {blog.author}
                    </Anchor>
                    <Text size="sm">Likes: {blog.likes}</Text>
                    <Divider></Divider>
                </Stack>
            ))}
        </div>
    );
};

export default UserView;
