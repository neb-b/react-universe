import express from 'express';
// import { renderToString } from 'react-dom/server'
// import { createStore } from 'redux'
// import { Provider } from 'react-redux'
// import reducer from './src/redux/reducers'
// import App from './app.js'
const app = express();
const port = process.env.port || 3000;

// app.use('/static', Express.static('static'));
// app.use('/', (req, res) => {
//   res.send(renderToString(App))
// })
// app.use(handleRender)

app.use('/', (req, res) => {
  res.send('transpiled yo');
});

// function handleRender() {
//   const store = createStore(reducer)
//   const html = renderToString(
//     <Provider>
//       <App />
//     </Provider>
//   )
// }


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});