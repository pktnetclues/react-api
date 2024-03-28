import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

export default function PostApiCall({ addPost }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formData, setFormData] = useState({
    title: "",
    body: "",
    userId: "",
  });

  const handleChange = (e) => {
    setFormData(...formData, ([e.target.name] = e.target.value));
  };

  const postData = {
    title: formData.title,
    body: formData.body,
    userId: formData.userId,
  };

  async function callApi() {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await res.json();
    addPost(data);
    handleClose();
  }

  function handleSubmit(e) {
    e.preventDefault();
    callApi();
  }

  return (
    <div>
      <Button onClick={handleShow}>Add New Post</Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Post Data</Modal.Title>
        </Modal.Header>
        <form className="post-api-inner" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              UserId
            </label>
            <input
              onChange={(e) => {
                setFormData(handleChange);
              }}
              name="userId"
              value={formData.userId}
              type="number"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="1"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Title
            </label>
            <input
              onChange={(e) => {
                setFormData(handleChange);
              }}
              name="title"
              value={formData.title}
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Pankaj Kumar"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Body
            </label>
            <textarea
              onChange={(e) => {
                setFormData(handleChange);
              }}
              value={formData.body}
              name="body"
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              required
            ></textarea>
          </div>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button className="btn btn-primary" type="submit">
              Add Post
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}
