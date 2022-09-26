import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import cover from "./../assets/blog-image.jpg";
import axios from "axios";
import { UserContext } from "./../UserContext";
const BlogCard = () => {
  const { user, setUser } = useContext(UserContext);
  const [blogs, setBlogs] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const tempBlogs = await axios.get(
          `${import.meta.env.VITE_API_ROOT}allBlogs`
        );
        setBlogs(tempBlogs.data);
      } catch (err) {
        alert(err);
      }
    })();
  }, []);

  return (
    <div className="container mt-4">
      {blogs?.map((blog, index) => (
        <Link to={`${blog?.id}`} className="reset-link">
          <div className="row" key={index}>
            <div className="col-1"></div>
            <div className="col-10  bg-white border border-2 p-3 rounded-3">
              <div className="upper-body">
                <img
                  src={blog?.blog_image}
                  alt="Cover Photo"
                  className="img-fluid"
                  style={{
                    maxHeight: `300px`,
                    objectFit: "cover",
                    maxWidth: `100%`,
                    width: `100%`,
                  }}
                />
              </div>
              <div className="lower-body p-3">
                <div className="user-details">
                  <p>{user?.username}</p>
                </div>
                <h2>{blog?.blog_header}</h2>
              </div>
            </div>
            <div className="col-1"></div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BlogCard;
