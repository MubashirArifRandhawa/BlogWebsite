import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Index from "./pages/Index";
import Protected from "./Protected";
import { UserContext } from "./UserContext.js";
const Pages = () => {
  const { user, setUser } = useContext(UserContext);
  console.log(user);
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route
        path="/main/*"
        element={
          <Protected isLoggedIn={user?.email}>
            <Index />
          </Protected>
        }
      />
    </Routes>
  );
};

export default Pages;
