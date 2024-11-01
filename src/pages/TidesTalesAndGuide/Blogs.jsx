import React, { useEffect, useState } from "react";
import { BlogsContainer } from "../../components/TidesTales&Guides/BlogsContainer";
import BoatsTable from "../../components/fleet/BoatsTable";
import axios from "../../axios";

const Blogs = () => {
  const [blogsData, setblogsData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getBlogs = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/owner/blog");
      setblogsData(data?.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async (id) => {
    try {
      const response = await axios.delete(`/owner/blog/${id}`);
      if (response.status === 200) {
        // Update the blogsData to remove the deleted blog
        setblogsData((prevBlogs) =>
          prevBlogs.filter((blog) => blog._id !== id)
        );
        console.log("Blog deleted successfully");
      } else {
        console.error("Failed to delete blog");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div className="h-full overflow-y-auto w-full p-2 lg:p-6 flex flex-col gap-6 justify-start items-start">
      <BlogsContainer
        data={blogsData}
        loading={loading}
        onDeleteBlog={deleteBlog}
      />
    </div>
  );
};

export default Blogs;
