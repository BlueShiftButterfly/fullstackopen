import PropTypes from "prop-types";
import { useField } from "../hooks";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import {
    Button,
    Container,
    Group,
    Space,
    Stack,
    TextInput,
} from "@mantine/core";
import { getHotkeyHandler } from "@mantine/hooks";

const BlogForm = ({ formRef }) => {
    const title = useField("text");
    const author = useField("text");
    const url = useField("text");
    const dispatch = useDispatch();

    const handleBlogCreation = (event) => {
        if (event) event.preventDefault();
        const newBlog = {
            title: title.value,
            author: author.value,
            url: url.value,
        };
        title.reset();
        author.reset();
        url.reset();
        dispatch(createBlog(newBlog));
        formRef.current.toggleVisibility();
    };

    return (
        <div>
            <Container size="xs">
                <Stack justify="center" align="stretch">
                    <Space></Space>
                    <TextInput
                        {...title}
                        reset=""
                        placeholder="Enter blog title"
                        label="Title"
                        required
                        onKeyDown={getHotkeyHandler([
                            ["Enter", handleBlogCreation],
                        ])}
                    ></TextInput>
                    <TextInput
                        {...author}
                        reset=""
                        placeholder="Enter blog author"
                        label="Author"
                        onKeyDown={getHotkeyHandler([
                            ["Enter", handleBlogCreation],
                        ])}
                    ></TextInput>
                    <TextInput
                        {...url}
                        reset=""
                        placeholder="Enter blog URL"
                        label="URL"
                        required
                        onKeyDown={getHotkeyHandler([
                            ["Enter", handleBlogCreation],
                        ])}
                    ></TextInput>
                    <Space h="lg"></Space>
                    <Group justify="space-between" grow>
                        <Button onClick={handleBlogCreation}>Create</Button>
                        <Button
                            onClick={(e) => {
                                e.preventDefault;
                                formRef.current.toggleVisibility();
                            }}
                            variant="default"
                        >
                            Cancel
                        </Button>
                    </Group>
                </Stack>
            </Container>
        </div>
    );
};

BlogForm.propTypes = {
    formRef: PropTypes.object.isRequired,
};

export default BlogForm;
