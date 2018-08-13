import React from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

import './index.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
      newBlog: {
        title: '',
        author: '',
        url: ''
      },
      notification: {
        type: '',
        text: ''
      }
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
      blogService.setToken(user.token)
    }
  }

  login = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
  
      this.setState({ username: '', password: '', user})
    } catch(exception) {
      this.setState({
        notification: {
          type: "error",
          text: "wrong username or password"
        }
      })
      setTimeout(() => {
        this.setState({
          notification: {
            type: "",
            text: ""
          }
        })
      }, 5000)
    }
  }

  logout = () => {
    window.localStorage.removeItem('loggedUser')
    this.setState({
      user: null
    })
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleBlogFormChange = (event) => {
    this.setState({
      newBlog: {...this.state.newBlog, [event.target.name]: event.target.value }
    })
  }

  handleBlogFormSubmit = async (event) => {
    event.preventDefault()
    try{
      const newBlog = await blogService.create(this.state.newBlog)

      this.setState({
        blogs: [...this.state.blogs, newBlog]
      })
      this.setState({
        notification: {
          type: "success",
          text: `a new blog '${this.state.newBlog.title}' by ${this.state.newBlog.author} added`
        }
      })
      setTimeout(() => {
        this.setState({
          notification: {
            type: "",
            text: ""
          }
        })
      }, 5000)
      this.setState({
        newBlog: {
          title: '',
          author: '',
          url: ''
        },
      })
    } catch(exception) {
      this.setState({
        notification: {
          type: "error",
          text: "There was an error with submitting the new blog"
        }
      })
      setTimeout(() => {
        this.setState({
          notification: {
            type: "",
            text: ""
          }
        })
      }, 5000)
    }
  }

  render() {
    const loginForm = () => (
      <div>
        <h1>Log in to application</h1>
    
        <form onSubmit={this.login}>
          <div>
            username
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <div>
            password
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <button type="submit">kirjaudu</button>
        </form>
      </div>
    )

    const blogList = () => (
      <div>
        {this.state.blogs.map(blog => 
          <Blog key={blog.id} blog={blog}/>
        )}
      </div>
    )
    return (
      <div>
        <Notification notification={this.state.notification}/>
        {this.state.user === null ?
        loginForm() :
        <div>
          <h1>blogs</h1>
          <p>{this.state.user.name} logged in</p>
          <button onClick={this.logout}>logout</button>
          <BlogForm
            newBlog={this.state.newBlog}
            onChange={this.handleBlogFormChange}
            onSubmit={this.handleBlogFormSubmit} />
          {blogList()}
        </div>
    }

      </div>
    );
  }
}

export default App;
