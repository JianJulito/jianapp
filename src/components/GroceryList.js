import React, { useState } from 'react';
import Modal from './Modal'; // Import the Modal component

const GroceryList = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'Apple', image: './img/apple.jpg', price: '10', category: 'Fruits' },
    { id: 2, name: 'Banana', image: './img/banana.jpg', price: '12', category: 'Fruits' },
    { id: 3, name: 'Lanzones', image: './img/lanzones.jpg', price: '10', category: 'Fruits' },
    { id: 4, name: 'Mango', image: './img/mango.jpg', price: '12', category: 'Fruits' },
    { id: 5, name: 'Carrot', image: './img/carrot.jpg', price: '15', category: 'Vegetables' },
    { id: 6, name: 'Cabbage', image: './img/cabbage.jpg', price: '20', category: 'Vegetables' },
    { id: 7, name: 'Eggplant', image: './img/eggplant.jpg', price: '15', category: 'Vegetables' },
    { id: 8, name: 'Patatas', image: './img/patatas.jpg', price: '20', category: 'Vegetables' },
  ]);

  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const [selectedItem, setSelectedItem] = useState(null); // Selected item for editing
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility

  const [checkedItems, setCheckedItems] = useState(new Set()); // Tracks checked items

  const categories = ['Fruits', 'Vegetables']; // Pre-defined categories for use in filtering

  // Filter items based on search term
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to handle editing an item
  const handleEdit = (id, name, price, image) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, name, price, image } : item
    ));
    setSelectedItem({ id, name, price, image });  // Update selected item after edit
  };

  // Function to handle deleting an item
  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
    setCheckedItems(new Set([...checkedItems].filter(itemId => itemId !== id))); // Remove from checked
  };

  // Open the modal for editing an item
  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  // Toggle checked state
  const toggleChecked = (id) => {
    setCheckedItems((prevCheckedItems) => {
      const newCheckedItems = new Set(prevCheckedItems);
      if (newCheckedItems.has(id)) {
        newCheckedItems.delete(id);
      } else {
        newCheckedItems.add(id);
      }
      return newCheckedItems;
    });
  };

  return (
    <div>
      <h1>Grocery List</h1>

      {/* Search Bar - centered at the top */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Flexbox Layout for Categories */}
      <div className="category-flex-container">
        {categories.map((category, index) => {
          const categoryItems = filteredItems.filter(item => item.category === category);
          const totalItems = categoryItems.length;
          const checkedCount = categoryItems.filter(item => checkedItems.has(item.id)).length;
          const remainingCount = totalItems - checkedCount;
          
          return (
            <div key={index} className="category-box">
              <div className="category-title">
                <h2>{category}</h2>
              </div>

              {categoryItems.length > 0 ? (
                <div className="item-flex-container">
                  {categoryItems.map((item) => (
                    <div key={item.id} className={`grocery-item ${checkedItems.has(item.id) ? 'checked' : ''}`}>
                      <div className="item-display">
                        <input
                          type="checkbox"
                          className="item-checkbox"
                          checked={checkedItems.has(item.id)}
                          onChange={() => toggleChecked(item.id)}
                        />
                        <img src={item.image} alt={item.name} className="item-image" />
                        <div className="item-info">
                          <div className="item-name">{item.name}</div>
                          <div className="item-price">₱{item.price}</div>
                        </div>
                      </div>
                      <div className="item-actions">
                        <button className="edit" onClick={() => openModal(item)}>Edit</button>
                        <button className="delete" onClick={() => handleDelete(item.id)}>Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No items in this category.</p>
              )}

              {/* Display checked and remaining count */}
              <div className="item-count">
                <p>Checked: {checkedCount} / {totalItems}</p>
                <p>Remaining: {remainingCount} / {totalItems}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal for Editing Item */}
      {isModalOpen && selectedItem && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSave={(name, price, image) => {
            handleEdit(selectedItem.id, name, price, image);  // Update the item
            closeModal();  // Close the modal after saving
          }}
          item={selectedItem}
        />
      )}
    </div>
  );
};

export default GroceryList;
