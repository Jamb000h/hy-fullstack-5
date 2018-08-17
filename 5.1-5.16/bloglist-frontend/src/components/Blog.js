import React from 'react'
import PropTypes from 'prop-types'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
    }
  }

  static propTypes = {
    handleLike: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    blog: PropTypes.object.isRequired,
    loggedUserId: PropTypes.string.isRequired,
  }

  toggleVisibility = () => {
    this.setState({visible: !this.state.visible})
  }

  like = () => {
    return () => {
      this.props.handleLike(this.props.blog.id)
    }
  }

  delete = () => {
    return () => {
      if(window.confirm(`Delete ${this.props.blog.title} by ${this.props.blog.author}?`)) {
        this.props.handleDelete(this.props.blog.id)
      }
    }
  }

  deleteButton = () => {
    if( !this.props.blog.user ||
        this.props.blog.user.id === this.props.loggedUserId) {
          return <button onClick={this.delete()}>delete</button>
        }
    return null
  }

  render() {

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    const blog = this.props.blog
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    return (
      <div style={blogStyle}>
        <div onClick={this.toggleVisibility}>
          {blog.title} {blog.author}
        </div>
        <div style={showWhenVisible}>
          {blog.url}
          {blog.likes}
          <button onClick={this.like()}>vote</button>
          added by {blog.user.name}
          {this.deleteButton()}
        </div>
      </div>  
    );
  }
}

export default Blog