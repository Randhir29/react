import { createContext, useContext } from "react";

// 1. Create Context
// In React, a context is a way to share state or data globally across components, without having to pass props manually at every level (called "prop drilling").
//React Context provides a way to pass data through the component tree without having to pass props down manually at every level.
//createContext() is a React function that creates a context object.
//It accepts a default value (which we're providing here).
//This value will be available to components via a context provider.

export const ToDoContext = createContext({

    // sample array of to-do items
    todos: [
        {
            id: 1,
            todo: "To do msg",
            completed: false,
        }
    ],

    //functionality
    addTodo: (todo) => {},
    updatedTodo: (id,todo)=>{},
    deleteTodo: (id)=>{},
    toggleComplete: (id)=> {}
})


//2. Create Context Provider
export const ToDoProvider = ToDoContext.Provider

// 3. Create Custom Hook to use Created Context in components.
export const useToDo =()=>{
    return useContext(ToDoContext)
}

