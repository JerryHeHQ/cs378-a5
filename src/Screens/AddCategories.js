import React, { useEffect, useState } from 'react';
import './AddCategories.css';
import { addCategories } from '../Backend/FirebaseAPI.js';

const AddCategories = ({ navigateToScreen }) => {
  const defaultCategories = [
    'Quality of Light', 'Contrast', 'Focus and Sharpness', 
    'Noise', 'Personal Style', 'Storytelling', 'Framing and Balance'
  ];
  const [categories, setCategories] = useState(defaultCategories);
  const [selectedCategories, setSelectedCategories] = useState(() => {
    const savedCategories = localStorage.getItem('selectedCategories');
    return savedCategories ? JSON.parse(savedCategories) : [];
  });

  useEffect(() => {
    localStorage.setItem('selectedCategories', JSON.stringify(selectedCategories));
    console.log(selectedCategories.toString())
  }, [selectedCategories]);

  const [newCategory, setNewCategory] = useState('');

  const handleCheckboxChange = (category) => {
    setSelectedCategories(prevSelected => {
      const newSelected = prevSelected.includes(category)
        ? prevSelected.filter(item => item !== category)
        : [...prevSelected, category];
      return newSelected;
    });
  };

  const addCategory = () => {
    if (newCategory) {
      setCategories([...categories, newCategory]);
      setNewCategory('');
    }
  };

  const handleInputChange = (event) => {
    setNewCategory(event.target.value);
  };

  const handleNextClick = async () => {
    const senderToken = '111111';
    const receiverToken = '222222';
    try {
      const saveSuccess = await addCategories(senderToken, receiverToken, selectedCategories);
      if (saveSuccess) {
        console.log('Categories saved successfully');
        navigateToScreen('ViewImage');
      } else {
        console.error('Failed to save categories');
      }
    } catch (error) {
      console.error('Error saving categories:', error);
    }
  };

  return (
    <div className="add-categories-screen">
      <header className="App-header">
        <p>Add Categories</p>
        <div className="search-container">
          <input type="text" placeholder="Add a new category" value={newCategory} onChange={handleInputChange} />
          <button onClick={addCategory}>Add</button>
        </div>

        <div className="categories-list">
          {categories.map((category, index) => (
            <div key={index} className="category-item">
              <input 
                type="checkbox" 
                id={`category-${index}`} 
                checked={selectedCategories.includes(category)}
                onChange={() => handleCheckboxChange(category)}
              />
              <label htmlFor={`category-${index}`}>{category}</label>
            </div>
          ))}
        </div>
        <div className="navigation-buttons">
          <button onClick={() => navigateToScreen('UploadPictures')}>Back</button>
          <button onClick={handleNextClick}>Next</button>
        </div>
      </header>
    </div>
  );
};

export default AddCategories;
