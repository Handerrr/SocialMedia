import Login from './pages/Login';
import Feed from './pages/Feed';
import Register from './pages/Register';
import { Route, Routes, useLocation } from 'react-router-dom';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import UserProfile from './pages/UserProfile';
import Search from './pages/Search';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './routes/PrivateRoute';

function App() {
  const location = useLocation();

  const hideLayout =
    location.pathname === '/' || location.pathname === '/register';

  return (
    <>
      {!hideLayout && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<PrivateRoute />}>
          <Route path="/feed" element={<Feed />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/users/:id" element={<UserProfile />} />
          <Route path="/search" element={<Search />} />
        </Route>
      </Routes>
      {!hideLayout && <Footer />}
    </>
  );
}

export default App;
