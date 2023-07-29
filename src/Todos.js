import React from 'react';

export default function Todos({ tasks, onChangeTask, onDeleteTask }) {
  return (
    <div>
      {tasks.map((t) => (
        <section key={t.id} style={{margin: '10px', display: 'flex',gap: '10px', alignSelf: 'center'}}>
          <input type="checkbox" checked={t.done} id={`task-${t.id}`} />
          <label htmlFor={`task-${t.id}`}>{t.text}</label>
          <button onClick={() => onChangeTask(t)}>Edit</button>
          <button onClick={() => onDeleteTask(t.id)}>Delete</button>
        </section>
      ))}
    </div>
  );
}
