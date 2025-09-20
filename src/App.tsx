import React, { useCallback, useEffect, useState } from "react";
import type { User } from "./types";
import "./App.css";
import { fetchRandomUsers } from "./api";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [originalUsers, setOriginalUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUsers = async () => {
    //Prevent multiple fetches at the same time
    if (loading) return;

    try {
      const data = await fetchRandomUsers(100);
      console.log(data);
      setUsers(data.results);
      setOriginalUsers(data.results);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = useCallback((userId: string) => {
    setUsers((currentUsers) =>
      currentUsers.filter((user) => user.login.uuid !== userId)
    );
  }, []);

  const restoreUsers = useCallback(() => {
    setUsers([...originalUsers]);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <main>
      <section>
        <button
          onClick={restoreUsers}
          disabled={users.length === originalUsers.length}
          style={{
            padding: "8px 16px",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Restaurar Estado Inicial
        </button>
      </section>

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
          {users.map((user) => (
            <UserRow user={user} key={user.login.uuid} onDelete={deleteUser} />
          ))}
        </tbody>
      </table>
    </main>
  );
}

const UserRow = React.memo(
  ({ user, onDelete }: { user: User; onDelete: (userId: string) => void }) => {
    const handleDelete = useCallback(() => {
      onDelete(user.login.uuid);
    }, [onDelete, user.login.uuid]);
    console.count("Rendering UserRow");
    return (
      <tr>
        <td>{user.login.username}</td>
        <td>
          {user.name.first} {user.name.last}
        </td>
        <td>{user.email}</td>
        <td>{user.phone}</td>
        <td>{user.location.country}</td>
        <td>
          <button
            onClick={handleDelete}
            style={{
              backgroundColor: "#ff4444",
              color: "white",
              border: "none",
              padding: "4px 8px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Eliminar
          </button>
        </td>
      </tr>
    );
  }
);

export default App;
