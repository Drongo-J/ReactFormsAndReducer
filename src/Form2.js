import React, { useState } from 'react'

const fruits =[
    {
        value: 'grapefruit',
        text: 'Grapefruit'
    },
    {
        value: 'mango',
        text: 'Mango'
    },
    {
        value: 'lime',
        text: 'Lime'
    },
    {
        value: 'coconut',
        text: 'Coconut'
    },
    {
        value: 'pineapple',
        text: 'Pineapple'
    }
]

export default function Form2() {
  const [state, setState] = useState({value:'coconut', text: 'Coconut'});

  function handleChange(e){
    setState({value : e.target.value});
  }

  function handleSubmit(e){
    e.preventDefault();
    alert("Yout favorite fruit is " + state.value)
  }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label>
                Pick your favorite fruit
            </label>
            <select value={state.value}
                    onChange={handleChange}>
               {
                    fruits.map(f => (
                        <option key={f.value} value={f.value}>{f.text}</option>
                    ))
               }
            </select>

            <input type='submit' value="Submit"></input>
        </form>
    </div>
  )
}
