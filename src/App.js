import React, { useState } from 'react';
import './App.css';

function App() {
  const [toDos, setTODos] = useState([]);
  const [toDo, setToDo] = useState('');

  // Function to add a new task
  const addToDo = () => {
    if (toDo.trim()) {
      setTODos([...toDos, { id: Date.now(), text: toDo, status: false }]);
      setToDo(''); // Clear the input after adding
    }
  };

  // Function to delete a task
  const deleteToDo = (id) => {
    setTODos(toDos.filter((obj) => obj.id !== id));
  };

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's Wednesday 🌝 ☕ </h2>
      </div>
      <div className="input">
        <input
          value={toDo}
          onChange={(e) => setToDo(e.target.value)}
          type="text"
          placeholder="🖊️ Add item..."
        />
        <i onClick={addToDo} className="fas fa-plus"></i>
      </div>
      <div className="todos">
        {toDos.map((obj) => (
          <div className="todo" key={obj.id}>
            <div className="left">
              <input
                type="checkbox"
                checked={obj.status}
                onChange={(e) => {
                  setTODos(
                    toDos.map((item) =>
                      item.id === obj.id
                        ? { ...item, status: e.target.checked }
                        : item
                    )
                  );
                }}
              />
              <p className={obj.status ? 'completed' : ''}>{obj.text}</p>
            </div>
            <div className="right">
              <i onClick={() => deleteToDo(obj.id)} className="fas fa-times delete"></i>
            </div>
          </div>
        ))}

        {/* Display Completed Tasks */}
        <div className="completedTasks">
          <h2>Completed Tasks</h2>
          {toDos
            .filter((obj) => obj.status)
            .map((obj) => (
              <p key={obj.id} className="completed">{obj.text}</p>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
