import React, { useState } from 'react';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';
import UploadImage from './UploadImage';
function App() {


const [name, setName] = useState('');
const [age, setAge] = useState('');

const handleAdd = async () => {
  try {
    await addDoc(collection(db, 'members'), {
      name: name,
      age: age
    });
    setName('');
    setAge('');
    alert('Document added successfully!');
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

return (
  <div>
    <UploadImage/>
  </div>
);
}

export default App;
