import React from 'react';


class App extends React.Component {

  lisaaAnekdootti = (event) => {
    event.preventDefault()
    const content = event.target.anekdootti.value
    this.props.store.dispatch({
      type: 'ADD_NEW',
      data: {
        text: content
      }
    })
    event.target.anekdootti.value = ''
  }

  render() {
    const anecdotes = this.props.store.getState().sort( (a,b) => { return b.votes - a.votes })
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={e => this.props.store.dispatch({ type: 'VOTE', data: anecdote })}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.lisaaAnekdootti}>
          <input name="anekdootti" type="text" />
          <button type="submit">create</button>
        </form>
      </div>
    )
  }
}

export default App