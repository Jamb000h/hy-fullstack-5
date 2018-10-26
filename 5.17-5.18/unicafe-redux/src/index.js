import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux'
import counterReducer from './palauteReducer';

const store = createStore(counterReducer)

const Otsikko = props => <h2>{props.teksti}</h2>

const Button = props => {
  return (
    <button onClick={props.onClick}>{props.teksti}</button>
  )
}

const PalauteLista = () => {
  return (
    <tbody>
      <Palaute teksti="hyvä" arvo={store.getState().good} />
      <Palaute teksti="neutraali" arvo={store.getState().ok} />
      <Palaute teksti="huono" arvo={store.getState().bad} />
    </tbody>
  )
}

const Palaute = props => {
  return (
    <tr>
      <td>{props.teksti}</td>
      <td>{props.arvo}</td>
    </tr>
  )
}

const Statistic = () => {

  const data = store.getState();

  const palautteita = Object.values(data).reduce( (yht, palaute) => yht + palaute, 0)
  const positiivisia = data.good / palautteita * 100

  return (
    <tr>
      <td>positiivisia</td>
      <td>{palautteita > 0 ? positiivisia.toFixed(1) : 0} %</td>
    </tr>
  )
}

class App extends Component {

  render() {
    return (
      <div>
        <Otsikko teksti="anna palautetta" />
        <Button teksti="hyva" onClick={e => store.dispatch({ type: 'GOOD' })} />
        <Button teksti="neutraali" onClick={e => store.dispatch({ type: 'OK' })} />
        <Button teksti="huono" onClick={e => store.dispatch({ type: 'BAD' })} />
        <Otsikko teksti="statistiikka" />
        <table>
          <PalauteLista />
          <Statistic />
        </table>
        <Button teksti="nollaa" onClick={e => store.dispatch({ type: 'ZERO' })} />
      </div>
    );
  }

}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
