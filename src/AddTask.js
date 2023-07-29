import React, { useState } from "react";

export default function AddTask({ onAddTask }) {
  const [text, setText] = useState("");

  return <form onSubmit={(e) => {
    e.preventDefault();
    onAddTask(text);
  }}>
    <input type="text" onChange={(e) => {setText(e.target.value)}}></input>    
    <button>Add</button>
  </form>;  
}
