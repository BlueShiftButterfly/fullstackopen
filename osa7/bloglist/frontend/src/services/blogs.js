import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
    token = `Bearer ${newToken}`;
};

const create = async (newBlog) => {
    const config = {
        headers: { Authorization: token },
    };

    const response = await axios.post(baseUrl, newBlog, config);
    return response.data;
};

const modify = async (blog) => {
    const response = await axios.put(baseUrl + "/" + blog.id, blog);
    return response.data;
};

const remove = async (id) => {
    const config = {
        headers: { Authorization: token },
    };

    const response = await axios.delete(baseUrl + "/" + id, config);
    return response.data;
};

const comment = async (id, comment) => {
    const config = {
        headers: { Authorization: token },
    };
    const newComment = { content: comment };
    const response = await axios.put(
        `${baseUrl}/${id}/comments`,
        newComment,
        config,
    );
    return response.data;
};

const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};

export default { getAll, setToken, create, modify, remove, comment };
