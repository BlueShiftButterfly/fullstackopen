import { useSelector } from "react-redux";
import { useMatch } from "react-router-dom";

const UserView = () => {
    const users = useSelector((state) => state.users);
    const match = useMatch("users/:id");
    const user = match ? users.find((u) => u.id === match.params.id) : null;
    if (!user) return null;
    return (
        <div>
            <h2>{user.name}</h2>
            <h3>Added Blogs</h3>
            <ul>
                {user.blogs.map((blog) => (
                    <li key={blog.id}>{blog.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserView;
