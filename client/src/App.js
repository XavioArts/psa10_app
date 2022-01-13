import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Public from './pages/Public';
import Protected from './pages/Protected';
import RequireAuth from './components/RequireAuth';
import LogIn from './pages/LogIn';
import Layout from './components/Layout';
import ProfileImageUpload from './components/ProfileImageUpload';
import EditCard from './components/EditCard';

function App() {
  return (
    <div>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/public" element={<Public />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/EditCard" element={<EditCard />} />
          <Route element={<RequireAuth />} >
            <Route path="/protected" element={<Protected />} />
            <Route path="/profile_image" element={<ProfileImageUpload />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
