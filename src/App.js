import React, { useState } from 'react';
import Swal from 'sweetalert2'; // Importing SweetAlert2
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

  // Function to delete a task with SweetAlert confirmation
  const deleteToDo = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        setTODos(toDos.filter((obj) => obj.id !== id)); // Deleting the task
        Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
      }
    });
  };

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
       
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
