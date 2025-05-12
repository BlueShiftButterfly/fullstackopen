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

const remove = async (blog) => {
    const config = {
        headers: { Authorization: token },
    };

    const response = await axios.delete(baseUrl + "/" + blog.id, config);
    return response.data;
};

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then((response) => response.data);
};

export default { getAll, setToken, create, modify, remove };
