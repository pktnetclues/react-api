import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "../index.css";
import PutApiCall from "./PutApiCall";
import DeleteApiCall from "./DeleteApiCall";
import PostApiCall from "./PostApiCall";

export default function ApiCall() {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    callApi();
  }, []);

  async function callApi() {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await res.json();
    setApiData(data.slice(0, 9));
  }

  async function deletePost(id) {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        method: "DELETE",
      }
    );

    if (res.status === 200) {
      setApiData(apiData.filter((post) => post.id !== id));
    } else {
      console.error("Failed to delete post");
    }
  }

  function updatePost(updatedPost) {
    const updatedData = apiData.map((post) =>
      post.id === updatedPost.id ? updatedPost : post
    );
    setApiData(updatedData);
  }

  function addPost(newPost) {
    setApiData([...apiData, newPost]);
  }

  return (
    <div className="main">
      <p>CRUD Operations</p>
      <PostApiCall addPost={addPost} />

      <Table className="table-content" striped bordered variant="dark">
        <thead>
          <tr>
            <th>Id</th>
            <th>UserId</th>
            <th>Title</th>
            <th>Body</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {apiData.map((data) => {
            return (
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.userId}</td>
                <td>{data.title}</td>
                <td>{data.body}</td>
                <td className="operation">
                  <DeleteApiCall handleDelete={() => deletePost(data.id)} />
                  <PutApiCall updatePost={updatePost} id={data.id} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
