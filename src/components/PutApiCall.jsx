import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

export default function PutApiCall({ id, title, body, userId, updatePost }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formData, setFormData] = useState({
    title: title,
    body: body,
    userId: userId,
  });

  const postData = {
    title: formData.title,
    body: formData.body,
    userId: formData.userId,
  };

  async function EditData() {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(postData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    const updatedData = await res.json();
    updatePost(updatedData);
    handleClose();
  }

  function handleSubmit(e) {
    e.preventDefault();
    EditData();
  }

  return (
    <div className="post-api">
      <Button onClick={handleShow}>
        <UpdateIcon />
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <div className="post-api-inner">
          <Modal.Header>
            <Modal.Title>Update Post</Modal.Title>
          </Modal.Header>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                UserId
              </label>
              <input
                onChange={(e) => {
                  setFormData({ ...formData, userId: e.target.value });
                }}
                value={formData.userId}
                type="number"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="1"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Title
              </label>
              <input
                onChange={(e) => {
                  setFormData({ ...formData, title: e.target.value });
                }}
                value={formData.title}
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Pankaj Kumar"
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Body
              </label>
              <textarea
                onChange={(e) => {
                  setFormData({ ...formData, body: e.target.value });
                }}
                value={formData.body}
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
              ></textarea>
            </div>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <button className="btn btn-primary" type="submit">
                Update
              </button>
            </Modal.Footer>
          </form>
        </div>
      </Modal>
    </div>
  );
}

const UpdateIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      fill="white"
      className="bi bi-pencil"
      viewBox="0 0 16 16"
    >
      <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
    </svg>
  );
};
