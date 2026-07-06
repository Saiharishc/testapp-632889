import React, { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [items, setItems] = useState([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemDescription, setNewItemDescription] = useState('');

  useEffect(() => {
    fetch('/')
      .then(response => response.json())
      .then(data => setMessage(data.message));

    fetch('/items')
      .then(response => response.json())
      .then(data => setItems(data));
  }, []);

  const handleAddItem = async () => {
    const newItem = { name: newItemName, description: newItemDescription };
    const response = await fetch('/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    });
    const addedItem = await response.json();
    setItems([...items, addedItem]);
    setNewItemName('');
    setNewItemDescription('');
  };

  return (
    <div className="App">
      <h1>{message}</h1>

      <h2>Items</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <strong>{item.name}</strong>: {item.description}
          </li>
        ))}
      </ul>

      <div>
        <h3>Add New Item</h3>
        <input
          type="text"
          placeholder="Name"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={newItemDescription}
          onChange={(e) => setNewItemDescription(e.target.value)}
        />
        <button onClick={handleAddItem}>Add Item</button>
      </div>
    </div>
  );
}

export default App;
