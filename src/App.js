import React, { useState } from 'react';
import Swal from 'sweetalert2'; 
import './App.css';

function App() {
  const [toDos, setTODos] = useState([]);
  const [toDo, setToDo] = useState('');
  const [editingId, setEditingId] = useState(null); 
  const [editingText, setEditingText] = useState('');

  // Function to add a new task
  const addToDo = () => {
    if (toDo.trim()) {
      setTODos([...toDos, { id: Date.now(), text: toDo, status: false }]);
      setToDo(''); 
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

  // Function to handle the start of editing
  const startEditing = (id, currentText) => {
    setEditingId(id);
    setEditingText(currentText);
  };

  // Function to handle saving the edited task
  const saveEdit = (id) => {
    setTODos(
      toDos.map((item) =>
        item.id === id ? { ...item, text: editingText } : item
      )
    );
    setEditingId(null); // Exit editing mode
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
              {editingId === obj.id ? (
              
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
              ) : (
                
                <p className={obj.status ? 'completed' : ''}>{obj.text}</p>
              )}
            </div>
            <div className="right">
              {editingId === obj.id ? (
                <i onClick={() => saveEdit(obj.id)} className="fas fa-save"></i> 
              ) : (
                <i onClick={() => startEditing(obj.id, obj.text)} className="fas fa-edit"></i> 
              )}
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
