import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Nav from './layouts/Nav';
import Login from './components/Login';
import Home from './components/Home';
import Search from './components/Search';
import Error from './components/Error';
import Profile from './components/Profile';
import Detail from './components/Detail';
import SortFilter from './components/SortFilter';
import About from './components/About';

function App() {

  const login = useSelector((state) => state.login);

  return (
    <>
      <Nav />
      {
        login ?
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/sort-filter/:category" element={<SortFilter />} />
            <Route path="*" element={<Error />} />
          </Routes>
          :
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="*" element={<Error />} />
          </Routes>
      }
    </>
  );
}

export default App;
