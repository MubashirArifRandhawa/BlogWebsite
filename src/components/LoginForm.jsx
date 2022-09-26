import { useState, useContext, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./../UserContext";

const LoginForm = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_ROOT}login`,
        {
          email,
          password,
        }
      );
      if (response.status == 200) {
        setUser({
          email: response.data.email,
          token: response.data.token,
          username: response.data.username,
          id: response.data.id,
          isLoggedIn: true,
        });
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: response.data.email,
            token: response.data.token,
            username: response.data.username,
            id: response.data.id,
            isLoggedIn: true,
          })
        );
      }
    } catch (err) {
      if (err.response.status == 500) {
        setError(true);
      }
    }
  }
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    if (currentUser?.email) {
      setUser({
        email: currentUser.email,
        token: currentUser.token,
        username: currentUser.username,
        id: currentUser.id,
        isLoggedIn: true,
      });
      navigate("/main");
    }
  }, [user]);
  return (
    <div className="container d-flex align-items-center justify-content-center min-w-100">
      <div className="col-4"></div>
      <div className="col-4">
        <div className="outer-styles p-3 border border-1 rounded-2 bg-white">
          <h2 className="mb-3 text-center">Login</h2>
          <Form onSubmit={handleLogin}>
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
                Don't have an account? <Link to={"/register"}>Register</Link>{" "}
                here!
              </Form.Text>
            </div>
            {error && (
              <p className="text-danger text-center">Email must be unique</p>
            )}
          </Form>
        </div>
      </div>
      <div className="col-4"></div>
    </div>
  );
};

export default LoginForm;
