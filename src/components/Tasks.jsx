import { NewTask } from './NewTask'

export const Tasks = ({ tasks, onAdd, onDelete }) => {
  return (
    <section>
      <h2 className='text-2xl font-bold text-stone-700 mb-4'>TASKS</h2>
      <NewTask onAdd={onAdd} />
      {tasks.length == 0 ? (
        <p className='text-stone-800 my-4'>
          This Project does not have any tasks yet.
        </p>
      ) : (
        <ul className='p-4 mt-8 rounded-md bg-stone-100'>
          {tasks.map((task) => {
            // console.log(task.taskID)
            return (
              <li className='flex justify-between my-4' key={task.taskID}>
                <span>{task.text}</span>
                <button
                  className='text-stone-700 hover:text-red-500'
                  onClick={() => onDelete(task.taskID)}
                >
                  Clear
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
