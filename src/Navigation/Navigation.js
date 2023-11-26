
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ThemeProvider from '../themeProvider/ThemeProvider';
import Dashboard from '../pages/dashbosrd/Dashboard';
import UserForm from '../pages/userform/userform';
import UserTable from '../pages/usertable/usertable';

const Navigation = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <ThemeProvider>
            <Dashboard />
          </ThemeProvider>
        }>
          <Route path="/userForm" element={<UserForm />} />
          <Route path="/userTable" element={<UserTable />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default Navigation;
