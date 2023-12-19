const Blog = ({ blog, deleteBlog }) => (
  <div>
    {blog.title} {blog.author} <button onClick={deleteBlog} className="deleteButton">Delete</button>
  </div>  
)

export default Blog