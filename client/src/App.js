import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Public from './pages/Public';
import Protected from './pages/Protected';
import EditProfileForm from './pages/EditProfileForm';
import RequireAuth from './components/RequireAuth';
import LogIn from './pages/LogIn';
import ShowcaseEdit from './pages/ShowcaseEdit';
import Layout from './components/Layout';
import ProfileImageUpload from './components/ProfileImageUpload';
import Collections from './pages/Collections';
import CardImageUpload from './components/CardImageUpload';
import Test from './pages/Test';
import EditCard from './pages/EditCard';
import ShowcaseNewForm from './components/ShowcaseNewForm';
import Showcase from './components/Showcase';
import AboutUs from './pages/AboutUs';
import CollectionNew from './pages/CollectionNew';

function App() {
  return (
    <div>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={<Home/>} />
          <Route path="/public" element={<Public/>} />
          <Route path="/about" element={<AboutUs />} /> 
          <Route path="/login" element={<LogIn/>} />
          <Route path="/test/:id" element={<Test/>} />

          {/* All routes below here are required to be logged in */}
          <Route element={<RequireAuth/>} >
            <Route path="/profile_image" element={<ProfileImageUpload/>} />
            <Route path="/profile/edit_card/:id" element={<EditCard/>} />

            {/* All routes nested in here will be sub pages to the profile */}
            <Route path="/profile" element={<Protected/>}>
            {/* <Route path="/dashboard" element={<Collections/>}> */}
              <Route path="/profile/collections" element={<Collections/>}/>
              <Route path="/profile/showcases" element={<Showcase/>}/>
              <Route path="/profile/showcases/:id/edit" element={<ShowcaseEdit/>} />
              {/* <Route path="/sets" element={<Sets/>}/>
              <Route path="/showcases" element={<Showcases/>}/> */}
            </Route>

            <Route path="/api/users/:id/edit" element={<EditProfileForm/>} />
            <Route path="/showcase/new" element={<ShowcaseNewForm/>} />

            <Route path="/collection/new" element={<CollectionNew/>} />
            <Route path="/cards/:id/image" element={<CardImageUpload/>} />
            <Route path="/users/:id/edit" element={<EditProfileForm/>} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
