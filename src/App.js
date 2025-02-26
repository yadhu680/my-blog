import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';

function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <BrowserRouter>
      <div className={`container ${theme}`}>
        <Navbar />
        <div className="main">
          <Routes>
            <Route path="/post/:postId" element={<PostPage />}></Route>
            <Route path="/search/:query?" element={<HomePage />}></Route>
            <Route path="/user/:userId?" element={<HomePage />}></Route>
            <Route path="/" element={<HomePage />}></Route>
          </Routes>
        </div>
        <div className="footer">Awesome Blog. All rights reserved</div>
      </div>
    </BrowserRouter>
  );
}

export default App;
