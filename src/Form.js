import React from "react";
import { useState } from "react";

export default function Form() {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("typing");
  if (status === "success") {
    return <h1>That's right</h1>;
  }

  function handleTextChange(e) {
    setAnswer(e.target.value);
  }

  async function submitForm(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let shouldError = answer.toLowerCase() !== 'baku';
            if (shouldError){
                reject(new Error('Good guess, but it is a wrong answer. Try Again!'));
            }
            resolve();
        }, 3000);
    });            
  }

  async function handleSubmit(e){
    e.preventDefault();
    setStatus('submitting');
    try {
        await submitForm();
        setStatus('success');
    } catch (error) {
        setStatus('typing');
        setError(error);
    }
  }

  return (
    <div>
      <h2>City Quiz</h2>
      <p>Which city is called windy place?</p>

      <form onSubmit={handleSubmit}>
        <textarea value={answer}
                  onChange={handleTextChange}
                  disabled={status === 'submitting'}>

        </textarea>
        <hr />
        <button disabled={answer.length === 0 || status==='submitting'}>
            Submit
        </button>
        {
            error != null && <p style={{color:'red'}}>{error.message}</p>
        }
      </form>
    </div>
  );
}
