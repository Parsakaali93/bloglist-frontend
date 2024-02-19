import { useState } from 'react'

const AddBlogForm = (props) => {
  const [blogName, setBlogName] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()

    if(!blogName || !blogUrl || !blogAuthor)
    {
      showError('Please fill out all the fields', 0)
      return
    }

    let newBlog = {
      title: blogName,
      author: blogAuthor,
      url: blogUrl
    }

    props.submitBlog(newBlog)
  }

  return(
    <form className="addBlog" onSubmit={ addBlog }>
      <div className="addBlogField">Name

        <input type="text" value={blogName} onChange={({ target }) => setBlogName(target.value)}></input>
      </div>

      <div className="addBlogField">Author

        <input type="text" value={blogAuthor} onChange={({ target }) => setBlogAuthor(target.value)}></input>

      </div>

      <div className="addBlogField">Url
        <input type="text" value={blogUrl} onChange={({ target }) => setBlogUrl(target.value)}></input>
      </div>
      <button type='submit'>Add</button>
    </form>
  )}

export default AddBlogForm