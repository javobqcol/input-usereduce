import { useEffect, useState } from "react";
import axios from "../api/axios";
const USERS_URL = "api/users";

export const Users = () => {
  axios;
  const [users, setUsers] = useState();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getUsers = async () => {
      try {
        const response = axios.get(USERS_URL, {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getUsers();
    return () =>{
      isMounted = false
      controller.abort()
    }
  }, []);

  return (
    <article className="wrapper">
      <h2>Users List</h2>
      {users?.length ? (
        <ul>
          {users.map((user, i) => (
            <li key={i}>{user.usename}</li>
          ))}
        </ul>
      ) : (
        <p> No user to display</p>
      )}
    </article>
  );
};
