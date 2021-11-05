import axios from "axios";
import React from "react";

const baseURL = "http://localhost:8080/api/users";

export default function UserComponent() {
  const [post, setPost] = React.useState([]);

 const onpress = ()=> {
    axios.get(baseURL).then((response) => {
      setPost(response.data);
    });
 }

  return (
    <div>
    <button onClick={onpress}>get users </button>
    <table>
    
      <tbody>
        <tr><th>Username</th><th>  Phash</th><th  >Role</th></tr>
        {
          post.map((person) => 
            <tr key={person.id}>
              <td>{person.username}</td>
              <td>{person.passwordHash}</td>
              <td>{person.role}</td>
            </tr>
         )
          }
      </tbody>
    </table>
    </div>
  );
}