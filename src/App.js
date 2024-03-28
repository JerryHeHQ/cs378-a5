import React, { useState } from 'react';
import './App.css';
import HomeScreen from './Screens/HomeScreen';
import UploadPictures from './Screens/UploadPictures';
import AddCategories from './Screens/AddCategories';
import ViewResults from './Screens/ViewResults';
import ViewImage from './Screens/ViewImage';
import ViewFeedback from './Screens/ViewFeedback';

import AddSessions from './Screens/AddSessions';
import AddFeedback from './Screens/AddFeedback';

// Firebase test
import { addFirestoreTest, getFirestoreTest } from "./Backend/FirebaseTest"

// Firebase (Cloud Firestore) backend initialization
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import firebaseConfig from "./Backend/FirebaseConfig";
firebase.initializeApp(firebaseConfig);

// App component
const App = () => {
  const [currentScreen, setCurrentScreen] = useState('Home');
  const [currentRole, setCurrentRole] = useState('Sender');
  const [images, setImages] = useState([]);

  // Function to switch screens
  const navigateToScreen = (screen) => {
    setCurrentScreen(screen);
  };

  const changeRole = (role) => {
    setCurrentRole(role);
  };

  const handleImageChange = (newImages) => {
    setImages(newImages);
  };

  // Render the current screen based on state
  let screenToRender;

  // Determine which screen to render based on currentScreen state
  switch (currentScreen) {
    case 'Home':
      screenToRender = <HomeScreen navigateToScreen={navigateToScreen} changeRole={changeRole}/>;
      break;
    case 'UploadPictures':
      screenToRender = <UploadPictures navigateToScreen={navigateToScreen} handleImageChange={handleImageChange} images={images}/>;
      break;
    case 'AddCategories':
      screenToRender = <AddCategories navigateToScreen={navigateToScreen}/>;
      break;
    case 'ViewImage':
      screenToRender = <ViewImage navigateToScreen={navigateToScreen} currentRole={currentRole} images={images}/>;
      break;
    case 'ViewFeedback':
      screenToRender = <ViewFeedback navigateToScreen={navigateToScreen} currentRole={currentRole}/>;
      break;
    case 'ViewResults':
      screenToRender = <ViewResults navigateToScreen={navigateToScreen} currentRole={currentRole}/>;
      break;
    case 'AddSessions':
      screenToRender = <AddSessions navigateToScreen={navigateToScreen}/>;
      break;
    case 'AddFeedback':
      screenToRender = <AddFeedback navigateToScreen={navigateToScreen}/>;
      break;
    default:
      screenToRender = <HomeScreen navigateToScreen={navigateToScreen} currentRole={changeRole}/>;
  }

  return (
    <div>
      {screenToRender}
      <button onClick={() => addFirestoreTest()}>Add Session Number</button>
      <button onClick={() => getFirestoreTest()}>Get Session Number</button>
    </div>
  );
};

export default App;
