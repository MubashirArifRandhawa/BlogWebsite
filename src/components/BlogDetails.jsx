import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./../UserContext";

const BlogDetails = () => {
  const { id } = useParams();
  const { user, setUser } = useContext(UserContext);
  const [blog, setBlog] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const tempBlogs = await axios.get(
          `${import.meta.env.VITE_API_ROOT}getBlog/${id}`
        );
        setBlog(tempBlogs.data);
      } catch (err) {
        alert(err);
      }
    })();
  }, []);
  return (
    <div className="container min-w-100 bg-white p-3">
      <div className="row">
        <div className="col-2"></div>
        <div className="col-8 ">
          <img src={blog?.blog_image} alt="" />
          <h1
            className="my-4"
            style={{ fontFamily: "'Rubik Dirt', cursive", maxWidth: `25ch` }}
          >
            {blog?.blog_header}
          </h1>
          <p>{blog?.blog_text}</p>
        </div>
        <div className="col-2"></div>
      </div>
    </div>
  );
};

export default BlogDetails;
