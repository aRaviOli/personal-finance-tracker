import './App.css'
import { useEffect, useState } from 'react';
import Welcome from './components/Welcome';
import Dashboard from './components/Dashboard';
import Layout from "./components/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ExpenseChart from "./components/ExpenseChart"; // you'll make this soon

function App() {
  const [user, setUser] = useState(null);
  const userKey = `user_${user}`;
  useEffect(() => {
    const savedUser = localStorage.getItem("finance_user");
    if (savedUser) setUser(savedUser);
  }, []);

  const handleLogin = (username) => setUser(username);
  const handleLogout = () => {
    localStorage.removeItem("finance_user");
    setUser(null);
  };

  return (
    <Router>
      <Layout showHeader={!!user} onTitleClick={() => setUser(user)}>
        <Routes>
          {!user ? (
            <Route path="*" element={<Welcome onLogin={handleLogin} />} />
          ) : (
            <>
              <Route path="/" element={<Dashboard user={user} onLogout={handleLogout} />} />
              <Route path="/charts" element={<ExpenseChart userKey={userKey} />} />
            </>
          )}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App
