import { useState, useEffect } from 'react'
import { ToDoProvider } from './contexts/ToDoContext'
import './App.css'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {
  const [todos, setTodos] = useState([])

  // Functionality of ToDoContext properties has been defined here in App.jsx
  // Then it has been passed into the <ToDoProvider> as part of the value:

  //1. addTodo : Take the live Todo from the app, adds new todo & change the state of todos
  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev])
  }

  //2. updatedTodo : Take the live Todo from the app, updates existing todo and change the state of todos
  const updatedTodo = (id, todo) => {
    //prev.map(...)	Loop through current todos
    //prevTodo.id === id	Check if this todo is the one we want to update
    //? todo	If yes → replace with new updated todo
    //: prevTodo	If no → keep original todo unchanged
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
  }

  const deleteTodo = (id) => {
    //	filter(...) : Array method that returns a new array with only items that match the condition.
    //(todo) => todo.id !== id : Keeps only the todos whose id does not match the one we're trying to delete.
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id) => {
    //console.log(id);
    //Create a new todo object by spreading all existing properties of prevTodo
    //Flip the value of completed: true → false, or false → true

    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id ? {
          ...prevTodo,
          completed: !prevTodo.completed
        } : prevTodo))
  }


  // Mounting in React refers to the process of creating and inserting a component into the DOM for the first time.

  // When a component mounts, React does the following:

  // Creates the component instance (for class components) or prepares function components.

  // Executes the rendering logic — returns JSX.

  // Inserts the generated DOM elements into the actual browser DOM.

  // There are 3 main phases in the lifecycle of a component:

  // Mounting – Component is being created and inserted into the DOM

  // Updating – Component re-renders due to changes in props or state

  // Unmounting – Component is removed from the DOM

  //Mounting	When a component is first created and added to the DOM
  //useEffect([])	Hook that runs only once when the component mounts

  // Retreiving from local storage. This ensures todos persist between page reloads or sessions, improving user experience:
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if (todos && todos.length > 0) {
      //Load saved todos into app state
      setTodos(todos)
    }
  }, [])

  // Storing todo in local storage. setItem : Key : "todos" and value: JSON.stringify(todos)
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])


  return (
    <ToDoProvider value={{ todos, addTodo, updatedTodo, deleteTodo, toggleComplete }}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => (
              <div key={todo.id}
                className='w-full'
              >
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToDoProvider>
  )
}

export default App
