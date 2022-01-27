import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Protected from './pages/Protected';
import UploadCollectible from './pages/UploadCollectible';
import EditProfileForm from './pages/EditProfileForm';
import RequireAuth from './components/RequireAuth';
import LogIn from './pages/LogIn';
import ShowcaseEdit from './pages/ShowcaseEdit';
import Layout from './components/Layout';
import ProfileImageUpload from './components/ProfileImageUpload';
import Collections from './pages/Collections';
import CardImageUpload from './components/CardImageUpload';
import EditCard from './pages/EditCard';
import ShowcaseNewForm from './components/ShowcaseNewForm';
import Showcases from './components/Showcases';
import AboutUs from './pages/AboutUs';
import CollectionNew from './pages/CollectionNew';
import Community from './pages/Community';
import Overview from './components/Overview';
import MessageBoard from './pages/MessageBoard';
import TopicPage from './pages/TopicPage';
import Collection from './components/Collection';
import EditCollection from './components/EditCollection';
import Showcase from './components/Showcases';
import UserCollections from './pages/UserCollections';
import UserCollectView from './pages/UserCollectView';
import Sets from './pages/Sets';
import UserOverview from './components/UserOverview';
import UserShowcases from './components/UserShowcases';
import CoverImgUpload from './pages/CoverImgUpload';
import LandingPage from './pages/LandingPage';
import UserSets from './pages/UserSets';

function App() {
  return (
    <div className="page-container">
      <div className="content-wrap">

        <div>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/test" element={<Home />} />
              <Route path="/community" element={<Community />} />
              <Route path="/community/users/:user_id/profile" element={<Protected />}>
                <Route path="/community/users/:user_id/profile/collections" element={<UserCollections />} />
                <Route path="/community/users/:user_id/profile/collections/:id" element={<UserCollectView />} />
                <Route path="/community/users/:user_id/profile/showcases" element={<UserShowcases />} />
                <Route path="/community/users/:user_id/profile/sets" element={<UserSets />} />
                <Route path="/community/users/:user_id/profile" element={<UserOverview />} />

              </Route>

              <Route path="/about" element={<AboutUs />} />
              <Route path="/messageboard" element={<MessageBoard />} />
              <Route path="/messageboard/:id" element={<TopicPage />} />
              <Route path="/login" element={<LogIn />} />

          {/* All routes below here are required to be logged in */}
          <Route element={<RequireAuth/>} >

                <Route path="/profile_image" element={<ProfileImageUpload />} />
                <Route path="/profile/edit_card/:id" element={<EditCard />} />
                <Route path="/upload" element={<UploadCollectible />} />

                {/* All routes nested in here will be sub pages to the profile */}
                <Route path="/profile" element={<Protected />}>
                  <Route path="/profile/collections" element={<Collections />} />
                  <Route path="/profile/collections/:id" element={<Collection />} />
                  <Route path="/profile/collections/:id/edit" element={<EditCollection />} />
                  <Route path="/profile/showcases" element={<Showcase />} />
                  <Route path="/profile/showcases" element={<Showcases />} />
                  <Route path="/profile/overview" element={<Overview />} />
                  <Route path="/profile/showcases/:id/edit" element={<ShowcaseEdit />} />
                  <Route path="/profile/sets" element={<Sets />} />
                </Route>

                <Route path="/profile/cover_image" element={<CoverImgUpload />} />
                <Route path="/api/users/:id/edit" element={<EditProfileForm />} />
                <Route path="/showcase/new" element={<ShowcaseNewForm />} />

                <Route path="/collection/new" element={<CollectionNew />} />
                <Route path="/cards/:id/image" element={<CardImageUpload />} />
                <Route path="/users/:id/edit" element={<EditProfileForm />} />
              </Route>
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
