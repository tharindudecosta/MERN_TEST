import {BrowserRouter, Routes, Route} from 'react-router-dom'

// pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/SignUp';

//components
import Navbar from './components/Navbar';
import UpdateWorkout from './components/WorkoutUpdate';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path='/WorkoutUpdate/:id' element={<UpdateWorkout/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/signup' element={<Signup/>}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;