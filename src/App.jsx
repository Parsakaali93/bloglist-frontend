import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import { formToJSON } from 'axios'
import axios from 'axios'


const App = () => {
  const [blogs, setBlogs] = useState([])

  const [loggedInUser, setLoggedInUser] = useState(null)
  const [username, setUsername] = useState([])
  const [password, setPassword] = useState([])

  const [blogName, setBlogName] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [errorVisible, setErrorVisible] = useState(false)
  const [errorColor, setErrorColor] = useState(0)
  const [errorMessageText, setErrorMessageText] = useState("An error has occurred")

  const setToken = newToken => { blogService.token = `Bearer ${newToken}` }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser') 
      if (loggedUserJSON) { 
        const user = JSON.parse(loggedUserJSON)
        setLoggedInUser(user)
        setToken(user.token)
      console.log(user.token)}
      }, [])

  useEffect(() => {
    const config = { headers: { Authorization: blogService.token }, }
    console.log(config)

    if(blogService.token){
        blogService.getAllForUser(config).then(blogs =>
      setBlogs( blogs )
    )}
  }, [])


// Test user: Maukkis hunter3
const handleLogin = async (event) => {
  event.preventDefault()

  try{
    console.log('logging in with', username, password)
    const response = await axios.post('/api/login', {username, password})
    setLoggedInUser(response.data)
    setUsername('')
    setPassword('')
    window.localStorage.setItem('loggedInUser', JSON.stringify(response.data)) 

    console.log(response.data)
    console.log(loggedInUser)
    setToken(response.data.token)
  }

  catch(exception){
    console.log(exception)
  }
}

const addBlog = async (event) => {
  event.preventDefault()

  if(!blogName || !blogUrl || !blogAuthor)
  {
    showError("Please fill out all the fields", 0)
    return
  }

  const config = { headers: { Authorization: blogService.token }, }

  let newBlog = {
    title: blogName,
    author: blogAuthor,
    url: blogUrl
  }

  console.log(`Adding blog ${JSON.stringify(newBlog)} for user ${JSON.stringify(config)}`)

  try{
    const response = await blogService.addBlogService(config, newBlog)
    showError(`Successfully added blog ${response.title} by ${response.author}`, 1)
  }

  catch(exception){
    showError(exception)
  }
}
const deleteBlog = async (id) => {
  
  try{
  const response = blogService.deleteBlog(id)
  showError('Successfully deleted blog', 1)

  }

  catch{
    showError('Failed to delete blog', 0)

  }

   setBlogs(oldBlogs => oldBlogs.filter(oldBlog => oldBlog.id !== id))
  /*
     .then(returnedNotes => {
          console.log(returnedNotes)
          setNotes(returnedNotes)
    })*/
}

const showError = (errorText, color) => {
  setErrorMessageText(errorText)
  setErrorColor(color)

  setErrorVisible(true)

  setTimeout(() => {
  setErrorVisible(false)}, 5000)
}

const test = () => {
  console.log(loggedInUser)
  // console.log(token)
}

const logout = () => {
  window.localStorage.clear()
  setLoggedInUser(null)
  setToken(null)
}

const loginForm = () => (
  <form onSubmit={handleLogin}>
    <div> USERNAME
    <input type="text" value={username} name="Username" onChange={({target}) => setUsername(target.value)}>
    </input>
    </div>
    <div> PASSWORD
    <input type="text" value={password} name="Password" onChange={({target}) => setPassword(target.value)}>
    </input>
    </div>
    <button type="submit">LOGIN</button>
  </form>
)

const errorMessage = () => (
  <div className='errorMessage' style={{border: errorColor===0 ? '3px solid red' : '3px solid green', color: errorColor===0 ? 'red' : 'green'}}><p>{errorMessageText}</p></div>
)

const loggedInForm = () => (
  <div>
  <p>Logged in as {loggedInUser.username}</p>
  <button onClick={logout}>LOGOUT</button>
  </div>
)

const loggedInAddBlog = () => (
  <form className="addBlog" onSubmit={addBlog}>
    <div className="addBlogField">Name

    <input type="text" value={blogName}  onChange={({target}) => setBlogName(target.value)}></input>
    </div>

    <div className="addBlogField">Author

       <input type="text" value={blogAuthor}  onChange={({target}) => setBlogAuthor(target.value)}></input>

    </div>

    <div className="addBlogField">Url
    <input type="text" value={blogUrl}  onChange={({target}) => setBlogUrl(target.value)}></input>
    </div>
    <button type='submit'>Add</button>
  </form>
)

  return (
    <div>
      {!loggedInUser && loginForm()}
      {loggedInUser && loggedInForm()}
      <button onClick={test}>TEST</button>
      {errorVisible && errorMessage()}
      {loggedInUser && loggedInAddBlog()}
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} deleteBlog={() => deleteBlog(blog.id)} blog={blog} />
      )}
    </div>
  )
}

export default App