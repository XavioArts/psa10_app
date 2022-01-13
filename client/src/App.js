import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Public from './pages/Public';
import Protected from './pages/Protected';
import EditProfileForm from './pages/EditProfileForm';
import RequireAuth from './components/RequireAuth';
import LogIn from './pages/LogIn';
import Layout from './components/Layout';
import ProfileImageUpload from './components/ProfileImageUpload';
import Collections from './pages/Collections';
import CardImageUpload from './components/CardImageUpload';
import ShowcaseNewForm from './components/ShowcaseNewForm';

function App() {
  return (
    <div>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={<Home/>} />
          <Route path="/public" element={<Public/>} />
          <Route path="/login" element={<LogIn/>} />
          <Route element={<RequireAuth/>} >
            <Route path="/profile_image" element={<ProfileImageUpload/>} />
            <Route path="/profile" element={<Protected/>}>
            {/* <Route path="/dashboard" element={<Collections/>}> */}
              <Route path="/profile/collections" element={<Collections/>}/>
              {/* <Route path="/sets" element={<Sets/>}/>
              <Route path="/showcases" element={<Showcases/>}/> */}
            </Route>
            <Route path="/api/users/:id/edit" element={<EditProfileForm/>} />
            <Route path="/showcase/new" element={<ShowcaseNewForm/>} />
            <Route path="/cards/:id/image" element={<CardImageUpload/>} />
            <Route path="/users/:id/edit" element={<EditProfileForm/>} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
