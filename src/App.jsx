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
  let token = null

  const setToken = newToken => { token = `Bearer ${newToken}` }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser') 
      if (loggedUserJSON) { 
        const user = JSON.parse(loggedUserJSON)
        setLoggedInUser(user)
        setToken(user.token)}
      }, [])

  useEffect(() => {
    const config = { headers: { Authorization: token }, }
        blogService.getAllForUser(config).then(blogs =>
      setBlogs( blogs )
    )  
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

const test = () => {
  console.log(loggedInUser)
  console.log(token)
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

const loggedInForm = () => (
  <div>
  <p>Logged in as {loggedInUser.username}</p>
  <button onClick={logout}>LOGOUT</button>
  </div>
)

  return (
    <div>
      {!loggedInUser && loginForm()}
      {loggedInUser && loggedInForm()}
      <button onClick={test}>TEST</button>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App