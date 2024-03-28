import React, { useState, useEffect } from 'react';
import { addFeedback } from "../Backend/FirebaseAPI"

const AddFeedback = ({ navigateToScreen }) => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [name, setName] = useState('');
  const [element, setElement] = useState('');
  const [description, setDescription] = useState('');
  const [effect, setEffect] = useState('');
  const [sentiment, setSentiment] = useState(false);
  const [category, setCategory] = useState(-1);
  const [savedCategories, setSavedCategories] = useState([]);
  const [categoryValues, setCategoryValues] = useState({});

  useEffect(() => {
    // Retrieve selected categories from local storage
    const savedCategories = localStorage.getItem('selectedCategories');
    if (savedCategories) {
      setSavedCategories(JSON.parse(savedCategories));
    }
    
    // Retrieve category values from local storage
    const savedCategoryValues = localStorage.getItem('categoryValues');
    if (savedCategoryValues) {
      setCategoryValues(JSON.parse(savedCategoryValues));
    }
  }, []);

  const saveCategoryValuesToLocalStorage = (values) => {
    localStorage.setItem('categoryValues', JSON.stringify(values));
  };

  const handleCategorySelection = (index) => {
    if (index === category) {
      // Deselect category
      setCategory(-1);
    } else {
      // Select category and update category values
      setCategory(index);
      setX(categoryValues[index]?.x || 0);
      setY(categoryValues[index]?.y || 0);
      setName(categoryValues[index]?.name || '');
      setElement(categoryValues[index]?.element || '');
      setDescription(categoryValues[index]?.description || '');
      setEffect(categoryValues[index]?.effect || '');
      setSentiment(categoryValues[index]?.sentiment || false);
    }
  };

  const xPos = (x) => {
    setX(x);
  }
  const yPos = (y) => {
    setY(y);
  }
  const nameChange = (x) => {
    setName(x);
    if (category !== -1) {
      setCategoryValues(prevState => ({
        ...prevState,
        [category]: { ...prevState[category], name: x }
      }));
      saveCategoryValuesToLocalStorage(categoryValues);
    }
  }
  const elementChange = (x) => {
    setElement(x);
    if (category !== -1) {
      setCategoryValues(prevState => ({
        ...prevState,
        [category]: { ...prevState[category], element: x }
      }));
      saveCategoryValuesToLocalStorage(categoryValues);
    }
  }
  const descriptionChange = (x) => {
    setDescription(x);
    if (category !== -1) {
      setCategoryValues(prevState => ({
        ...prevState,
        [category]: { ...prevState[category], description: x }
      }));
      saveCategoryValuesToLocalStorage(categoryValues);
    }
  }
  const effectChange = (x) => {
    setEffect(x);
    if (category !== -1) {
      setCategoryValues(prevState => ({
        ...prevState,
        [category]: { ...prevState[category], effect: x }
      }));
      saveCategoryValuesToLocalStorage(categoryValues);
    }
  }
  const sentimentChange = (x) => {
    setSentiment(x);
    if (category !== -1) {
      setCategoryValues(prevState => ({
        ...prevState,
        [category]: { ...prevState[category], sentiment: x }
      }));
      saveCategoryValuesToLocalStorage(categoryValues);
    }
  }
  const categoryChange = (x) => {
    setCategory(x);
  }
  
  return (
    <div>
      <header className="App-header">
        <p>Add Feedback</p>
        <div>
          <label>Critiquer Name:</label>
          <input type="text" value={name} onChange={e => nameChange(e.target.value)} />
        </div>
        <div>
          <label>Formal Element:</label>
          <input type="text" value={element} onChange={e => elementChange(e.target.value)} />
        </div>
        <div>
          <label>Description:</label>
          <input type="text" value={description} onChange={e => descriptionChange(e.target.value)} />
        </div>
        <div>
          <label>Effect:</label>
          <input type="text" value={effect} onChange={e => effectChange(e.target.value)} />
        </div>

        <div>
          <button
            style={{
              backgroundColor: sentiment === 1 ? 'green' : 'transparent',
              border: 'none',
              marginRight: '10px'
            }}
            onClick={() => sentimentChange(1)}
          >
            Positive
          </button>
          <button
            style={{
              backgroundColor: sentiment === 2 ? 'red' : 'transparent',
              border: 'none',
            }}
            onClick={() => sentimentChange(2)}
          >
            Negative
          </button>
        </div>

        <div>
          <p>Select Category:</p>
          {savedCategories.map((cat, index) => (
            <div key={index}>
              <input
                type="checkbox"
                id={`category${index}`}
                checked={category === index}
                onChange={() => handleCategorySelection(index)}
              />
              <label htmlFor={`category${index}`}>{cat}</label>
            </div>
          ))}
        </div>

        <div>
          <button className="add-feedback" onClick={() => {
            console.log(addFeedback('111111', '222222', 2, 0, 0, name, element, description, effect, (sentiment == 1) ? true : false, category));
            }}>Submit</button>
        </div>

        <div>
          <button onClick={() => navigateToScreen('ViewFeedback')}>Back</button>
          <button onClick={() => navigateToScreen('ViewResults')}>Next</button>
        </div>
      </header>
    </div>
  );
};

export default AddFeedback;
