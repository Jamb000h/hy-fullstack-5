import React from 'react'
const BlogForm = (props) => (
  <form onSubmit={props.onSubmit}>
    <input 
      type="text"
      name="title"
      value={props.newBlog.title}
      onChange={props.onChange} />

     <input
      type="text"
      name="author"
      value={props.newBlog.author}
      onChange={props.onChange} />

     <input
      type="text"
      name="url"
      value={props.newBlog.url}
      onChange={props.onChange} />

      <input type="submit" value="create" />
  </form> 
)

export default BlogForm