//The index.js file in this case is acting as a barrel file.
// A barrel file is an index.js (or index.ts) file used to group and re-export multiple modules from a folder — making imports cleaner and more maintainable.
//Re-exports ToDoContext, ToDoProvider, and useToDo from ToDoContext.js. So any file outside the folder can import from the folder directly, like this:
//import { ToDoProvider, useToDo } from './context'; // instead of './context/ToDoContext'


export {ToDoContext,ToDoProvider,useToDo} from "./ToDoContext"