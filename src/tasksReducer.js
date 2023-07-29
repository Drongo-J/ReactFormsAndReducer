export default function tasksReducer(tasks, action) {
    switch (action.type) {
      case 'added':{
        return [
          ...tasks,
          {
            id: action.id,
            text: action.text,
            done: false
          }
        ];
      }
      case 'deleted':{
        var newTasks = tasks.filter((t) => t.id !== action.id);
        return newTasks;
      }
      case 'changed':{
        return tasks.map((t) => {
          if (t.id === action.task.id){
            return action.task;
          }
          else{
            return t;
          }
        })
      }
      default:
        break;
    }

}
