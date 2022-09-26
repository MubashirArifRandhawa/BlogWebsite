import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import AddBlog from "../components/AddBlog";
import BlogCardContainer from "../components/BlogCardContainer";
import BlogDetails from "../components/BlogDetails";
import NavigationBar from "../components/NavigationBar";
const Index = () => {
  return (
    <div className=" min-w-100">
      <NavigationBar />
      <Routes>
        <Route path="/" element={<BlogCardContainer />} />
        <Route path=":id" element={<BlogDetails />} />
        <Route path="add-blog" element={<AddBlog />} />
      </Routes>
    </div>
  );
};

export default Index;
