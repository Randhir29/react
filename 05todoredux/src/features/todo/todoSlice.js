import {createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
    todos: [{id: 1, text: "Hello world"}],
    editableTodos: null
}



export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(), 
                text: action.payload
            }
            state.todos.push(todo)
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload )
        },
        editableTodo:(state,action)=>{
            //fetching out to be edited todo and storing it in editableTodos
            //values shall be over written so that at a time only one todo shall be updated
            state.editableTodos = action.payload;
            
        },
        updateTodo:(state,action)=>{
            // Destructuring action.payload object and storing it in id & text field
            const {id,text} = action.payload;
            //finding the first object as per condition and storing it in todo
            // The filter method will give array of objects while find method will directly give object 
            // Finding todo in in todos array and matching it with action.payload.id
            const todo = state.todos.find((todo)=>(todo.id===id));
            // validating todo before setting text key value of todo
            if (todo) todo.text=text;
            //Resetting editableTodos to null upon updation of text
            state.editableTodos =null;

        }
    }
})

export const {addTodo, removeTodo, editableTodo,updateTodo} = todoSlice.actions

export default todoSlice.reducer