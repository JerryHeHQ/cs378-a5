import React, { useState } from 'react';

const ViewResults = ({ navigateToScreen, currentRole }) => {
  const senderNavigationPath = 'ViewFeedback';
  const receiverNavigationPath = 'AddFeedback';
  const navigationPath = currentRole === 'Sender' ? senderNavigationPath : receiverNavigationPath;
    return (
      <div>
        <header className="App-header">
          <p>
          ViewResults
          </p>
          <div>
              <button onClick={() => navigateToScreen(navigationPath)}>Back</button>
              <button onClick={() => navigateToScreen('Home')}>Next</button>
          </div>
        </header>
      </div>
    );
  };

  export default ViewResults;
