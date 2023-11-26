
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserForm from '../pages/userform/userform';
import UserTable from '../pages/usertable/usertable';
import MySidebar from "./sidebar";

const Navigation = () => {
  return (
    <Router>
      <MySidebar />
      <Routes>
        <Route path="/" element={<UserForm />} />
        <Route path="/usertable" element={<UserTable />} />
      </Routes>
    </Router>
  );
};

export default Navigation;
