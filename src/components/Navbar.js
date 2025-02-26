import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../ThemeContext';

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${query}`);
  };
  return (
    <div className="header">
      <div className="header-item">
        <a href="/">
          <strong>Awesome Blog</strong>
        </a>
      </div>
      <div className="header-item">
        <form onSubmit={handleSubmit}>
          <input
            name="query"
            placeholder="Search posts"
            onChange={(e) => setQuery(e.target.value)}
          />
          <button>Go</button>
        </form>
      </div>
      <div className="header-item">
        <a href="/login">Login</a>
        <button onClick={toggleTheme}>
          {theme === 'light' ? 'Theme:light' : 'Theme:dark'}
        </button>
      </div>
    </div>
  );
}
