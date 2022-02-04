import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useState } from 'react';

function App() {

  const [todolist, settodo] = useState([])
  const [list, setlist] = useState('')


  const apiHandle = axios.create({
    baseURL: "http://localhost:5000"
  })

  const getData = () => {
    apiHandle
      .get("/lists")
      .then((res) => {
        console.log(res.data)
        settodo([...res.data])

        console.log(todolist);
      })
  }

  const postData = () => {

    apiHandle
      .post("/lists", { todo: list })
      .then((res) => {
        console.log(res.data.todo)
      })
  }
  const delData = (id) => {
    apiHandle
      .delete("/lists/:id", { id })
      .then((res) => {
        console.log(res.data.todo)
      })
  }
  return (
    <div className="App">
      <div>
        <h1>todo  App</h1>
        <input onChange={(e) => setlist(e.target.value)} />
        {todolist.length > 0 ? todolist.map((e, i) => {
          return (
            <div key={i}>

              <p >{e.todo}</p>
              <button onClick={delData}>delete</button>

             
            </div>

          )
        }) : ''}
        <button onClick={getData}>get</button>
        <button onClick={postData}>post</button>

      </div>
    </div>
  );
}

export default App;

