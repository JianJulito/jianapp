import React, { useState, useEffect } from 'react';
import './Modal.css';  // Remove this line from App.js or Modal.js

const Modal = ({ isOpen, onClose, onSave, item }) => {
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemImage, setItemImage] = useState('');

  useEffect(() => {
    if (item) {
      setItemName(item.name);
      setItemPrice(item.price);
      setItemImage(item.image);
    }
  }, [item]);  // Reset the modal inputs when `item` changes

  if (!isOpen) return null;  // If modal isn't open, don't render it

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Item</h2>
        <input 
          id="itemName" 
          placeholder="Item Name" 
          value={itemName} 
          onChange={(e) => setItemName(e.target.value)} 
        />
        <input 
          id="itemPrice" 
          placeholder="Price" 
          value={itemPrice} 
          onChange={(e) => setItemPrice(e.target.value)} 
        />
        <input 
          id="itemImage" 
          placeholder="Image URL"
          value={itemImage} 
          onChange={(e) => setItemImage(e.target.value)} 
        />
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button 
            onClick={() => {
              onSave(itemName, itemPrice, itemImage);  // Pass updated data
              onClose();  // Close the modal after saving
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
