import { useRef } from "react";
import { useSelector } from "react-redux";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";
import { Link } from "react-router-dom";
import {
    Anchor,
    Container,
    Divider,
    Flex,
    Group,
    Space,
    Stack,
    Text,
    Title,
} from "@mantine/core";

const Home = () => {
    const blogs = useSelector((state) => state.blogs);

    const blogFormRef = useRef();
    return (
        <div>
            <Title>Blogs</Title>
            <Space h="lg"></Space>
            <Divider></Divider>
            <Space h="lg"></Space>
            <Togglable buttonLabel="Create New Blog" ref={blogFormRef}>
                <BlogForm formRef={blogFormRef}></BlogForm>
            </Togglable>
            <Space h="lg"></Space>
            <Stack>
                {blogs.map((blog) => (
                    <Stack key={blog.id}>
                        <Anchor component={Link} to={`/blogs/${blog.id}`}>
                            {blog.title} by {blog.author}
                        </Anchor>
                        <Flex gap="lg">
                            <Text size="sm">
                                Posted by{" "}
                                <Anchor
                                    component={Link}
                                    to={`/users/${blog.user.id}`}
                                >
                                    {blog.user.name}
                                </Anchor>
                            </Text>
                            <Text size="sm">Likes: {blog.likes}</Text>
                        </Flex>
                        <Divider></Divider>
                    </Stack>
                ))}
            </Stack>
        </div>
    );
};

export default Home;
