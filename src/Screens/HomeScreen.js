// import React, { useState } from 'react';
// import { createSession, joinSession } from "../Backend/FirebaseAPI"

// async function getCodes(setSenderCode, setReceiverCode) {
//   const result = await createSession();
//   setSenderCode(result[0]);
//   setReceiverCode(result[1]);
//   return result;
// }

// async function joinCode(code) {
//   const result = await joinSession(code);
//   if (result == 1) {
//     console.log("Valid Sender Code!");
//   } else if (result == 0) {
//     console.log("Valid Receiver Code!");
//   } else {
//     console.log("Invalid Code");
//   }
// }

// const HomeScreen = ({ navigateToScreen, changeRole }) => {
//   const [receiverCode, setReceiverCode] = useState("...");
//   const [senderCode, setSenderCode] = useState("...");
//   const [inputCode, setInputCode] = useState("");

//   return (
//     <div>
//       <header className="App-header">
//         <button className="generate-code" onClick={() => {
//           console.log(getCodes(setSenderCode, setReceiverCode));
//         }}>Generate Session Code</button>
        
//         {/* onClick: pass in setCode to generation func */}
//         <div className="sender-code">
//           Sender Code: {senderCode}
//         </div>
//         <div className="receiver-code">
//           Receiver Code: {receiverCode}
//         </div>
        
//         Input Session Code
//         <label>
//           <input name="input-code"/>
//         </label>
//         {/* onClick: verify code */}
//         <button className="enter-code" onClick={() => {
//           const result = joinCode()
//         }}> Enter code </button>
//       </header>   

//       <div>
//         <button onClick={() => {navigateToScreen('UploadPictures'); changeRole('Sender') }}>Go To Sender</button>
//         <button onClick={() => {navigateToScreen('ViewImage'); changeRole('Receiver')}}>Go To Receiver</button>
//       </div>
//     </div>

//   );
// };

// export default HomeScreen;

import React, { useState } from 'react';
import { createSession, joinSession } from "../Backend/FirebaseAPI"

const HomeScreen = ({ navigateToScreen, changeRole }) => {
  const [code, setCode] = useState("...");

  return (
    <div>
      <header className="App-header">
        <button className="generate-code" onClick={() => console.log(createSession())}>Generate Session Code</button>
        
        {/* onClick: pass in setCode to generation func */}
        <div className="code-display">
          {code}
        </div>
        
        Input Session Code
        <label>
          <input name="input-code"/>
        </label>
        {/* onClick: verify code */}
        <button className="enter-code"> Enter code </button>
      </header>   

      <div>
        <button onClick={() => { navigateToScreen('UploadPictures'); changeRole('Sender') }}>Go To Sender</button>
        <button onClick={() => {navigateToScreen('AddSessions'); changeRole('Receiver')}}>Go To Receiver</button>
      </div>
    </div>

  );
};

export default HomeScreen;