import { useState } from "react";
import { Form, Button, Row, Col, FloatingLabel } from "react-bootstrap";
import axios from "axios";
const AddBlog = () => {
  const [header, setHeader] = useState("");
  const [image, setImage] = useState({ preview: "", data: "" });
  const [text, setText] = useState("");
  const [success, setSuccess] = useState(false);
  const u = JSON.parse(localStorage.getItem("user"));
  async function handleAddBlog(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profileImg", image.data);
    formData.append("header", header);
    formData.append("text", text);
    formData.append("id", u.id);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_ROOT}add-blog`, {
        method: "POST",
        body: formData,
      });
      if (response.status == 201) {
        setSuccess(true);
      }
    } catch (err) {
      console.log(err);
    }
  }
  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
  };
  return (
    <div className="container min-w-100 bg-white p-3">
      <div className="row">
        <div className="col-2"></div>
        <div className="col-8">
          <h2 className="mb-4 text-center">Add a Blog</h2>
          <div className="container">
            <div className="row">
              <div className="col-4"></div>
              <div className="col-2 d-flex gap-3 align-items-center justify-content-center">
                <label>Size</label>
                <Form.Control type="number" />
              </div>
              <div className="col-2 d-flex gap-3 align-items-center justify-content-center">
                <label>Color</label>
                <Form.Control type="color" />
              </div>
              <div className="col-4"></div>
            </div>
          </div>
          <Form onSubmit={handleAddBlog} encType="multipart/form-data">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Heading</Form.Label>
              <Form.Control
                type="text"
                value={header}
                onChange={(e) => setHeader(e.target.value)}
                required
              />
            </Form.Group>
            <FloatingLabel controlId="floatingTextarea2" label="Blog">
              <Form.Control
                as="textarea"
                style={{ height: "100px" }}
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
              />
            </FloatingLabel>
            <Form.Group controlId="formFile" className="mt-3">
              <Form.Control
                type="file"
                name="file"
                onChange={(e) => handleFileChange(e)}
              />
            </Form.Group>
            <Form.Group controlId="formFile" className="mt-3 text-center">
              <Button variant="success" type="submit">
                Add Blog
              </Button>
            </Form.Group>
          </Form>
          <p className="text-danger text-center">*All fields are required</p>
          {success && (
            <p className="text-success text-center">Blog Added Successfully</p>
          )}
        </div>
        <div className="col-2"></div>
      </div>
    </div>
  );
};

export default AddBlog;
