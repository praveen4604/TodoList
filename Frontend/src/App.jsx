import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import TaskList from './components/TaskList';
import CreateTask from './components/CreateTask';
import EditTask from './components/EditTask';
import Login from './components/Login';
import Register from './components/Register';

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<TaskList />} />
        <Route path='/create' element={<CreateTask />} />
        <Route path='/edit/:id' element={<EditTask />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </>
  );
}