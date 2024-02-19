import { useState } from 'react'

const Blog = ({ blog, deleteBlog, incrementLikes }) => {
  const [detailedView, setDetailedView] = useState(false)
  const detailedStyle = {
    border:'1px solid black',
    marginTop:'5px',
    marginBottom:'5px',
    padding: '5px'
  }

  return(
    <div style={detailedView ? detailedStyle : {}}>
      {blog.author} - {blog.title}
      {detailedView && <div><p>{blog.url}</p><p>{blog.likes} Likes<button onClick={() => incrementLikes({ ...blog, likes: blog.likes + 1 })}>Like</button></p><p>Added by {blog.user.username}</p></div>}
      <button onClick={() => setDetailedView(!detailedView)}>details</button><button onClick={deleteBlog} className="deleteButton">Delete</button>
    </div>
  )
}

export default Blog