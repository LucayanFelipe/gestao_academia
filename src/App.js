import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import WorkoutRoutine from './pages/WorkoutRoutine';
import Nutrition from './pages/Nutrition';
import Sidebar from './pages/Sidebar';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div className="app">
        {user && <Sidebar setUser={setUser} />} {/* Passe setUser para o Sidebar */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoute user={user} />}>
              <Route path="/dashboard" element={<Dashboard user={user} />} />
              <Route path="/workoutroutine" element={<WorkoutRoutine />} />
              <Route path="/nutrition" element={<Nutrition />} />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;