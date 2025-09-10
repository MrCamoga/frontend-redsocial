import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './components/home/Home';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Profile from './components/profile/Profile';
import Post from './components/post/PostDetail';
import Register from './components/register/Register';
import Login from './components/login/Login';
import RestrictedPage from './guards/RestrictedPage';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile/:username' element={<Profile />} />
          <Route path='/posts/:postid' element={<Post />} />
          <Route path='/register' element={<RestrictedPage logged={false} ><Register /></RestrictedPage>} />
          <Route path='/login' element={<RestrictedPage logged={false} ><Login /></RestrictedPage>} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App