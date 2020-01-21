import React from 'react';
import ReactDOM from 'react-dom';
import dva, { connect } from 'dva';
import './index.css';
import './public-path';
import * as serviceWorker from './serviceWorker';

// function render() {
//   ReactDOM.render(<App />, document.getElementById('root'));
// }

export async function bootstrap() {
  console.log('react app bootstraped');
}

let app;

export async function mount(props) {
  console.log(props);
  app = dva();
  app.model({
    namespace: 'count',
    state: 0,
    reducers: {
      add(count) { return count + 1 },
      minus(count) { return count - 1 },
    },
  });

  // 3. View
  const App = connect(({ count }) => ({
    count
  }))(function (props) {
    return (
      <div>
        <h2>{props.count}</h2>
        <button key="add" onClick={() => { props.dispatch({ type: 'count/add' }) }}>+</button>
        <button key="minus" onClick={() => { props.dispatch({ type: 'count/minus' }) }}>-</button>
      </div>
    );
  });

  // 4. Router
  app.router(() => <App />);

  // 5. Start
  app.start('#root');
}

export async function unmount() {
  ReactDOM.unmountComponentAtNode(document.getElementById('root'));
  app.unmodel('count');
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// 2. Model

