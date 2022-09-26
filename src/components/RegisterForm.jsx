import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  async function submitForm(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_ROOT}register`,
        {
          email,
          password,
          username,
        }
      );
      if (response.status == 201) {
        setSuccess(true);
        setError(false);
      }
    } catch (err) {
      if (err.response.status == 500) {
        setError(true);
        setSuccess(false);
      }
    }
  }
  return (
    <div className="container d-flex align-items-center justify-content-center  min-w-100">
      <div className="col-4"></div>
      <div className="col-4">
        <div className="outer-styles p-3 border border-1 rounded-2 bg-white">
          <h2 className="mb-3 text-center">Register</h2>
          <Form onSubmit={submitForm}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <div className="text-center d-flex flex-column  align-items-center">
              <Button variant="primary" type="submit">
                Submit
              </Button>
              <Form.Text>
                Already have an account? <Link to={"/"}>Login</Link> here!
              </Form.Text>
            </div>
            {error && (
              <p className="text-danger text-center">Email must be unique</p>
            )}
            {success && (
              <p className="text-success text-center">
                User created successfully
              </p>
            )}
          </Form>
        </div>
      </div>
      <div className="col-4"></div>
    </div>
  );
};

export default RegisterForm;
