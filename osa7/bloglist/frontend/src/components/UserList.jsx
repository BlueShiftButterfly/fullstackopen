import { Divider, Space, Table, Title } from "@mantine/core";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UserList = () => {
    const users = useSelector((state) => state.users);
    const getLikeCount = (user) => {
        if (user.blogs.length <= 0) return 0;
        return user.blogs.map((blog) => blog.likes).reduce((a, c) => a + c);
    };
    return (
        <div>
            <Title>Users</Title>
            <Space h="lg"></Space>
            <Divider></Divider>
            <Space h="lg"></Space>
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Name</Table.Th>
                        <Table.Th>Blogs posted</Table.Th>
                        <Table.Th>Likes Received</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {users
                        .toSorted((a, b) => getLikeCount(b) - getLikeCount(a))
                        .map((user) => (
                            <Table.Tr key={user.id}>
                                <Table.Td>
                                    <Link to={`/users/${user.id}`}>
                                        {user.name}
                                    </Link>
                                </Table.Td>
                                <Table.Td>{user.blogs.length}</Table.Td>
                                <Table.Td>{getLikeCount(user)}</Table.Td>
                            </Table.Tr>
                        ))}
                </Table.Tbody>
            </Table>
        </div>
    );
};

export default UserList;
