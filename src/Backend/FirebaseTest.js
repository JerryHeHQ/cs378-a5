import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// Function to add a session number to Firestore
async function addFirestoreTest() {

  const db = firebase.firestore();
  const sessionNumber = 123456;

  try {
    await db.collection('sessions').doc(sessionNumber.toString()).set({
      number: sessionNumber
    });
    console.log('Session number added to Firestore:', sessionNumber);
  } catch (error) {
    console.error('Error adding session number to Firestore:', error);
  }

}

// Function to retrieve the session number from Firestore
async function getFirestoreTest() {

  const db = firebase.firestore();
  const sessionNumber = 123456;

  try {
    const doc = await db.collection('sessions').doc(sessionNumber.toString()).get();
    if (doc.exists) {
      const retrievedSessionNumber = doc.data().number;
      console.log('Retrieved session number from Firestore:', retrievedSessionNumber);
    } else {
      console.log('No session number found in Firestore');
    }
  } catch (error) {
    console.error('Error getting session number from Firestore:', error);
  }

}

export { addFirestoreTest, getFirestoreTest };