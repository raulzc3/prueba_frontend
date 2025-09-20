import { useEffect, useState } from "react";
import type { User } from "./types";
import "./App.css";
import { fetchRandomUsers } from "./api";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUsers = async () => {
    //Prevent multiple fetches at the same time
    if (loading) return;

    try {
      const data = await fetchRandomUsers(100);
      console.log(data);
      setUsers(data.results);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Usuario</th>
          <th>Nombre</th>
          <th>E-mail</th>
          <th>Teléfono</th>
          <th>País</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, idx) => (
          <UserRow user={user} key={user.login.uuid + idx} />
        ))}
      </tbody>
    </table>
  );
}

const UserRow = ({ user }: { user: User }) => {
  return (
    <tr>
      <td>{user.login.username}</td>
      <td>
        {user.name.first} {user.name.last}
      </td>
      <td>{user.email}</td>
      <td>{user.phone}</td>
      <td>{user.location.country}</td>
    </tr>
  );
};

export default App;
