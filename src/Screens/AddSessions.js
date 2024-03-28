import React, { useState } from 'react';

const AddSessions = ({ navigateToScreen }) => {
    return (
      <div>
        <header className="App-header">
          <p>
          AddSessions
          </p>
          <div>
              <button onClick={() => navigateToScreen('Home')}>Back</button>
              <button onClick={() => navigateToScreen('ViewImage')}>Next</button>
          </div>
        </header>
      </div>
    );
  };

  export default AddSessions;
