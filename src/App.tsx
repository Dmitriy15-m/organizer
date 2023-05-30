import { Route, Routes } from 'react-router-dom';
import './App.css';
import CalendarContainer from './Components/CalendarContainer/CalendarContainer';
import TodoListContainer from './Components/TodoListConatainer/TodoListContainer';



const App = () => {
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<CalendarContainer />} />
        <Route path="/TodoList" element={<TodoListContainer />} />
      </Routes>
    </div>
  );
};

export default App;
