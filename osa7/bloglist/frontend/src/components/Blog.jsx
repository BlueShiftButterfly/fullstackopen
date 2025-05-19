import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { commentBlog, likeBlog, removeBlog } from "../reducers/blogReducer";
import loginstorage from "../services/loginstorage";
import { useField } from "../hooks";
import { Link, useNavigate } from "react-router-dom";
import {
    Anchor,
    Avatar,
    Button,
    Collapse,
    Divider,
    Flex,
    Group,
    Space,
    Stack,
    Text,
    Textarea,
    Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

const Blog = ({ blog }) => {
    const dispatch = useDispatch();
    const canRemove = loginstorage.me() === blog.user.username;
    const commentContent = useField("text");
    const navigate = useNavigate();

    const handleLike = (event) => {
        event.preventDefault();
        dispatch(likeBlog(blog));
    };

    const handleComment = (event) => {
        event.preventDefault();
        dispatch(commentBlog(blog, commentContent.value));
        commentContent.reset();
    };

    const handleRemove = (event) => {
        event.preventDefault();
        if (
            window.confirm(
                `Do you want to remove ${blog.title} by ${blog.author}?`,
            )
        ) {
            dispatch(removeBlog(blog));
            navigate("/");
        }
    };

    const getProperUrL = (baseUrl) => {
        // This is because react-router likes to read URLs
        // without http:// as internal links >:(
        if (!baseUrl) return "";
        if (baseUrl.startsWith("http://") || baseUrl.startsWith("https://"))
            return baseUrl;
        return `https://${baseUrl}`;
    };

    return (
        <div>
            <Title>
                {blog.title} by {blog.author}
            </Title>
            <Space h="lg"></Space>
            <Divider></Divider>
            <Space h="lg"></Space>
            <Anchor href={getProperUrL(blog.url)} target="_blank">
                {blog.url}
            </Anchor>
            <Space h="lg"></Space>
            <Flex gap="lg" align="center">
                <Text>
                    Posted by{" "}
                    <Anchor component={Link} to={`/users/${blog.user.id}`}>
                        {blog.user.name}
                    </Anchor>
                </Text>
                <Text>Likes: {blog.likes}</Text>
                <Button onClick={handleLike}>Like</Button>
            </Flex>
            <Space h="lg"></Space>
            <Title order={3}>Comments</Title>
            <Space h="md"></Space>

            <Flex gap="sm" align="flex-start" direction="column">
                <Textarea
                    placeholder="Enter your comment here"
                    autosize
                    maxRows={4}
                    w="600"
                    {...commentContent}
                    reset=""
                ></Textarea>
                <Button onClick={handleComment}>Comment</Button>
            </Flex>
            <Space h="md"></Space>

            <Divider></Divider>

            {blog.comments.toReversed().map((comment) => (
                <Stack key={comment.id}>
                    <Space h="xs"></Space>
                    <Flex gap="sm" align="center">
                        <Avatar></Avatar>
                        <Text size="sm">Anonymous Commenter:</Text>
                    </Flex>
                    <Text size="lg">{comment.content}</Text>
                    <Divider></Divider>
                </Stack>
            ))}
        </div>
    );
};

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
};

export default Blog;
